import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAgent extends Document {
    userId: mongoose.Types.ObjectId;
    agentCode: string;
    region: string;
    assignedPartners: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const AgentSchema: Schema<IAgent> = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        agentCode: { type: String, required: true, unique: true },
        region: { type: String, required: true },
        assignedPartners: [{ type: Schema.Types.ObjectId, ref: 'Partner' }],
    },
    { timestamps: true }
);

const Agent: Model<IAgent> =
    mongoose.models.Agent || mongoose.model<IAgent>('Agent', AgentSchema);

export default Agent;
