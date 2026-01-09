import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { UserRole, OrderStatus } from '@/lib/enums';
import { z } from 'zod';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

export const runtime = 'nodejs';

// Schema
const orderItemSchema = z.object({
    productId: z.string(),
    quantity: z.number().min(1),
});

const placeOrderSchema = z.object({
    partnerId: z.string().optional(), // For Admin/Agent to place on behalf
    items: z.array(orderItemSchema).min(1),
});

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

        await connectToDatabase();
        const Order = (await import('@/lib/models/Order')).default;
        const Partner = (await import('@/lib/models/Partner')).default;
        const Agent = (await import('@/lib/models/Agent')).default;

        let filter = {};
        if (session.user.role === UserRole.PARTNER) {
            const profile = await Partner.findOne({ userId: session.user.id });
            if (!profile) return NextResponse.json({ success: false, error: 'Profile not found' }, { status: 404 });
            filter = { partnerId: profile._id };
        } else if (session.user.role === UserRole.AGENT) {
            const profile = await Agent.findOne({ userId: session.user.id });
            if (!profile) return NextResponse.json({ success: false, error: 'Profile not found' }, { status: 404 });
            filter = { agentId: profile._id };
        }

        const orders = await Order.find(filter)
            .populate('partnerId', 'businessName')
            .populate('agentId', 'agentCode')
            .populate('items.productId', 'name unit')
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: orders });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const validatedData = placeOrderSchema.parse(body);

        await connectToDatabase();
        const Order = (await import('@/lib/models/Order')).default;
        const Partner = (await import('@/lib/models/Partner')).default;
        const Product = (await import('@/lib/models/Product')).default;
        const PartnerPrice = (await import('@/lib/models/PartnerPrice')).default;

        // Determine Partner
        let partnerId = validatedData.partnerId;
        if (session.user.role === UserRole.PARTNER) {
            const profile = await Partner.findOne({ userId: session.user.id });
            if (!profile) return NextResponse.json({ success: false, error: 'Profile not found' }, { status: 404 });
            partnerId = profile._id.toString();
        }

        if (!partnerId) return NextResponse.json({ success: false, error: 'Partner ID required' }, { status: 400 });

        const partner = await Partner.findById(partnerId);
        if (!partner) return NextResponse.json({ success: false, error: 'Partner not found' }, { status: 404 });

        // Calculate Totals using Transaction
        const sessionDb = await mongoose.startSession();
        let createdOrder;

        await sessionDb.withTransaction(async () => {
            let totalAmount = 0;
            const itemsWithPrices = [];

            for (const item of validatedData.items) {
                const product = await Product.findById(item.productId).session(sessionDb);
                if (!product) throw new Error(`Product not found: ${item.productId}`);

                if (item.quantity < product.moq) {
                    throw new Error(`MOQ not met for ${product.name}. Min: ${product.moq}`);
                }

                // Get Price (Custom or Base)
                let price = product.basePrice;
                const customPrice = await PartnerPrice.findOne({ partnerId, productId: product._id }).session(sessionDb);
                if (customPrice) {
                    price = customPrice.price;
                }

                const lineTotal = price * item.quantity;
                totalAmount += lineTotal;

                itemsWithPrices.push({
                    productId: product._id,
                    quantity: item.quantity,
                    price: price,
                    total: lineTotal
                });
            }

            createdOrder = await Order.create([{
                partnerId: partner._id,
                agentId: partner.assignedAgent,
                items: itemsWithPrices,
                totalAmount: totalAmount,
                status: OrderStatus.PENDING,
            }], { session: sessionDb });
        });

        await sessionDb.endSession();

        return NextResponse.json({ success: true, data: createdOrder ? createdOrder[0] : null }, { status: 201 });

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: 'Validation Error', details: error.errors }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
