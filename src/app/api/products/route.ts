import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { UserRole, ProductUnit } from '@/lib/enums';
import { z } from 'zod';
import connectToDatabase from '@/lib/db';

export const runtime = 'nodejs';

const createProductSchema = z.object({
    name: z.string().min(2),
    category: z.string().min(2), // Name of category
    description: z.string().optional(),
    unit: z.nativeEnum(ProductUnit),
    moq: z.number().min(1),
    basePrice: z.number().min(0),
    image: z.string().optional(),
});

export async function GET(req: NextRequest) {
    try {
        // Public Access allowed (or restrict if needed)
        const { searchParams } = new URL(req.url);
        const categoryName = searchParams.get('category');

        await connectToDatabase();
        const Product = (await import('@/lib/models/Product')).default;
        const Category = (await import('@/lib/models/Category')).default;

        let filter: any = { isActive: true };

        if (categoryName) {
            const cat = await Category.findOne({ name: { $regex: categoryName, $options: 'i' } });
            if (cat) {
                filter.category = cat._id;
            } else {
                // Category not found, return empty
                return NextResponse.json({ success: true, data: [] });
            }
        }

        const products = await Product.find(filter).populate('category', 'name');
        return NextResponse.json({ success: true, data: products });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== UserRole.ADMIN) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = createProductSchema.parse(body);

        await connectToDatabase();
        const Product = (await import('@/lib/models/Product')).default;
        const Category = (await import('@/lib/models/Category')).default;

        // Find or Create Category
        let category = await Category.findOne({ name: { $regex: new RegExp(`^${validatedData.category}$`, 'i') } });
        if (!category) {
            category = await Category.create({ name: validatedData.category });
        }

        const product = await Product.create({
            ...validatedData,
            // category: category._id,
        });

        return NextResponse.json({ success: true, data: product }, { status: 201 });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: 'Validation Error', details: error.message }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
