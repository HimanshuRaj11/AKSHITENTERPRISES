import mongoose, { Schema, Document, Model } from 'mongoose';
import { PartnerType } from '@/lib/enums';

export interface IPartner extends Document {
    userId: mongoose.Types.ObjectId;
    businessName: string;
    partnerType: PartnerType;
    gstNumber?: string;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };
    assignedAgent?: mongoose.Types.ObjectId;
    creditLimit?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PartnerSchema: Schema<IPartner> = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        businessName: { type: String, required: true },
        partnerType: {
            type: String,
            enum: Object.values(PartnerType),
            required: true,
        },
        gstNumber: { type: String },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        assignedAgent: { type: Schema.Types.ObjectId, ref: 'Agent' },
        creditLimit: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Partner: Model<IPartner> =
    mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema);

export default Partner;
