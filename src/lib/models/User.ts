import Link from 'next/link'; // Unused here, just keeping imports clean? No, wait.
import mongoose, { Schema, Document, Model } from 'mongoose';
import { UserRole } from '@/lib/enums';

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    password?: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: false }, // Optional for potential OAuth later, but required for Credentials
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.PARTNER,
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
