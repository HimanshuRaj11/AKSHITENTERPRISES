import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPartnerPrice extends Document {
    partnerId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

const PartnerPriceSchema: Schema<IPartnerPrice> = new Schema(
    {
        partnerId: {
            type: Schema.Types.ObjectId,
            ref: 'Partner',
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        price: { type: Number, required: true },
    },
    { timestamps: true }
);

// Compound index to ensure unique price per partner-product pair
PartnerPriceSchema.index({ partnerId: 1, productId: 1 }, { unique: true });

const PartnerPrice: Model<IPartnerPrice> =
    mongoose.models.PartnerPrice ||
    mongoose.model<IPartnerPrice>('PartnerPrice', PartnerPriceSchema);

export default PartnerPrice;
