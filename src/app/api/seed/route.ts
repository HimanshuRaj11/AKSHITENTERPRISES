import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';
import Category from '@/lib/models/Category';
import Product from '@/lib/models/Product';
import { UserRole, ProductUnit } from '@/lib/enums';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await connectToDatabase();

        // 1. Create Admin
        const adminEmail = 'admin@akshit.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                name: 'Akshit Admin',
                email: adminEmail,
                phone: '1234567890',
                password: hashedPassword,
                role: UserRole.ADMIN,
            });
            console.log('Admin created');
        }

        // 2. Create Categories
        const categories = [
            { name: 'Healthcare Textiles', description: 'Medical grade fabrics and garments' },
            { name: 'Eco Packaging', description: 'Sustainable packaging solutions' },
            { name: 'Industrial Supplies', description: 'Heavy duty industrial materials' }
        ];

        for (const cat of categories) {
            await Category.findOneAndUpdate(
                { name: cat.name },
                cat,
                { upsert: true, new: true }
            );
        }

        // 3. Create Dummy Products
        const healthCat = await Category.findOne({ name: 'Healthcare Textiles' });
        const count = await Product.countDocuments();

        if (count === 0 && healthCat) {
            await Product.create({
                name: 'Surgical Gown Standard',
                categoryId: healthCat._id,
                description: 'Standard protection surgical gown, blue.',
                unit: ProductUnit.PCS,
                moq: 100,
                basePrice: 150,
            });
            await Product.create({
                name: 'Nitrile Gloves Box',
                categoryId: healthCat._id,
                description: 'Box of 100 powder-free nitrile gloves.',
                unit: ProductUnit.PACK,
                moq: 50,
                basePrice: 400,
            });
        }

        return NextResponse.json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Seeding failed', details: error }, { status: 500 });
    }
}
