import mongoose, { Schema, Document, Model } from 'mongoose';
import { ProductUnit } from '@/lib/enums';

export interface IProduct extends Document {
    name: string;
    categoryId: mongoose.Types.ObjectId;
    description: string;
    unit: ProductUnit;
    moq: number;
    basePrice: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
    {
        name: { type: String, required: true },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        description: { type: String, required: true },
        unit: {
            type: String,
            enum: Object.values(ProductUnit),
            default: ProductUnit.PCS,
        },
        moq: { type: Number, required: true, default: 1 },
        basePrice: { type: Number, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Product: Model<IProduct> =
    mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
