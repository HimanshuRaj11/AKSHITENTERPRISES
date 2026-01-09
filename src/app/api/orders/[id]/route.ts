import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { UserRole, OrderStatus } from '@/lib/enums';
import { z } from 'zod';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

export const runtime = 'nodejs';

// Schema
const updateStatusSchema = z.object({
    status: z.nativeEnum(OrderStatus),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== UserRole.ADMIN) { // Allow Agent?
            // Refine logic: Agent can approve their own orders
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = updateStatusSchema.parse(body);
        const { id } = await params;
        const orderId = id;

        await connectToDatabase();
        const Order = (await import('@/lib/models/Order')).default;
        const Invoice = (await import('@/lib/models/Invoice')).default;
        const Partner = (await import('@/lib/models/Partner')).default;

        const order = await Order.findById(orderId);
        if (!order) return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });

        // Update Status
        order.status = validatedData.status;
        await order.save();

        // If APPROVED, Generate Invoice
        if (validatedData.status === OrderStatus.APPROVED) {
            // Check if invoice exists
            const existingInvoice = await Invoice.findOne({ orderId: order._id });
            if (!existingInvoice) {
                const partner = await Partner.findById(order.partnerId);
                const gstRate = 0.18; // 18% GST example
                const gstAmount = order.totalAmount * gstRate;
                const totalPayable = order.totalAmount + gstAmount;

                await Invoice.create({
                    invoiceNumber: `INV-${Date.now()}`,
                    orderId: order._id,
                    partnerId: order.partnerId,
                    gstAmount: gstAmount,
                    totalPayable: totalPayable,
                });
            }
        }

        return NextResponse.json({ success: true, data: order });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
