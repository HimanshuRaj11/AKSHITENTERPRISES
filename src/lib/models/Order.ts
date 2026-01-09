import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrderStatus } from '@/lib/enums';

export interface IOrderItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
    total: number;
}

export interface IOrder extends Document {
    orderNumber: string;
    partnerId: mongoose.Types.ObjectId;
    agentId?: mongoose.Types.ObjectId;
    status: OrderStatus;
    items: IOrderItem[];
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

const OrderItemSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
    },
    { _id: false }
);

const OrderSchema: Schema<IOrder> = new Schema(
    {
        orderNumber: { type: String, required: true, unique: true },
        partnerId: {
            type: Schema.Types.ObjectId,
            ref: 'Partner',
            required: true,
        },
        agentId: { type: Schema.Types.ObjectId, ref: 'Agent' },
        status: {
            type: String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.PENDING,
        },
        items: [OrderItemSchema],
        totalAmount: { type: Number, required: true },
    },
    { timestamps: true }
);

const Order: Model<IOrder> =
    mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
