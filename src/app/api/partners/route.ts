import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { UserRole, PartnerType } from '@/lib/enums';
import { z } from 'zod';
import connectToDatabase from '@/lib/db';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

const createPartnerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    password: z.string().min(6),
    businessName: z.string().min(2),
    partnerType: z.nativeEnum(PartnerType),
    gstNumber: z.string().optional(),
    address: z.string().min(5),
    assignedAgent: z.string().optional(), // ID
    creditLimit: z.number().optional(),
});

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const Partner = (await import('@/lib/models/Partner')).default;
        const Agent = (await import('@/lib/models/Agent')).default;
        const User = (await import('@/lib/models/User')).default;

        let filter = {};
        if (session.user.role === UserRole.AGENT) {
            // Agent can only see their assigned partners
            // Need to find the Agent profile for this User first
            const agentProfile = await Agent.findOne({ userId: session.user.id });
            if (!agentProfile) {
                return NextResponse.json({ success: false, error: 'Agent profile not found' }, { status: 404 });
            }
            filter = { assignedAgent: agentProfile._id };
        } else if (session.user.role === UserRole.PARTNER) {
            // Partner sees only themselves
            // Find Partner profile
            const partnerProfile = await Partner.findOne({ userId: session.user.id });
            if (!partnerProfile) {
                return NextResponse.json({ success: false, error: 'Partner profile not found' }, { status: 404 });
            }
            filter = { _id: partnerProfile._id };
        }
        // Admin sees all (empty filter)

        const partners = await Partner.find(filter)
            .populate('userId', 'name email phone isActive')
            .populate('assignedAgent', 'agentCode region');

        return NextResponse.json({ success: true, data: partners });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// export async function POST(req: NextRequest) {
//     try {
//         const session = await auth();
//         if (!session?.user || (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.AGENT)) {
//             return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
//         }

//         const body = await req.json();
//         const validatedData = createPartnerSchema.parse(body);

//         await connectToDatabase();
//         const Partner = (await import('@/lib/models/Partner')).default;
//         const Agent = (await import('@/lib/models/Agent')).default;
//         const User = (await import('@/lib/models/User')).default;

//         // If Creator is AGENT, force assignedAgent to be themselves
//         if (session.user.role === UserRole.AGENT) {
//             const agentProfile = await Agent.findOne({ userId: session.user.id });
//             if (!agentProfile) {
//                 return NextResponse.json({ success: false, error: 'Agent profile not found' }, { status: 404 });
//             }
//             validatedData.assignedAgent = agentProfile._id.toString();
//         }

//         // 1. Create User
//         const hashedPassword = await bcrypt.hash(validatedData.password, 10);
//         const user = await User.create({
//             name: validatedData.name,
//             email: validatedData.email,
//             phone: validatedData.phone,
//             password: hashedPassword,
//             role: UserRole.PARTNER,
//         });

//         // 2. Create Partner
//         const partner = await Partner.create({
//             userId: user._id,
//             businessName: validatedData.businessName,
//             partnerType: validatedData.partnerType,
//             gstNumber: validatedData.gstNumber,
//             address: validatedData.address,
//             assignedAgent: validatedData.assignedAgent,
//             creditLimit: validatedData.creditLimit || 0,
//         });

//         // 3. Update Agent's assignedPartners list if assigned
//         if (partner.assignedAgent) {
//             await Agent.findByIdAndUpdate(partner.assignedAgent, {
//                 $addToSet: { assignedPartners: partner._id }
//             });
//         }

//         return NextResponse.json({ success: true, data: partner }, { status: 201 });
//     } catch (error: any) {
//         if (error instanceof z.ZodError) {
//             return NextResponse.json({ error: true, message: 'Validation Error', details: error.message }, { status: 400 });
//         }
//         return NextResponse.json({ error: true, message: error.message }, { status: 500 });
//     }
// }
