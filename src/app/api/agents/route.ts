import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { UserRole } from '@/lib/enums';
import { z } from 'zod';
import connectToDatabase from '@/lib/db';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

const createAgentSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    password: z.string().min(6),
    agentCode: z.string().min(3),
    region: z.string().min(3),
});

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== UserRole.ADMIN) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        // Dynamic Imports
        const Agent = (await import('@/lib/models/Agent')).default;
        const User = (await import('@/lib/models/User')).default;

        const agents = await Agent.find().populate('userId', 'name email phone isActive');

        return NextResponse.json({
            success: true,
            data: agents
        });
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
        const validatedData = createAgentSchema.parse(body);

        await connectToDatabase();
        const Agent = (await import('@/lib/models/Agent')).default;
        const User = (await import('@/lib/models/User')).default;

        // 1. Create User
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        const user = await User.create({
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            password: hashedPassword,
            role: UserRole.AGENT,
        });

        // 2. Create Agent
        const agent = await Agent.create({
            userId: user._id,
            agentCode: validatedData.agentCode,
            region: validatedData.region,
        });

        return NextResponse.json({ success: true, data: agent }, { status: 201 });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: 'Validation Error', details: error.message }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
