import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInvoice extends Document {
    invoiceNumber: string;
    orderId: mongoose.Types.ObjectId;
    partnerId: mongoose.Types.ObjectId;
    gstAmount: number;
    totalPayable: number;
    invoiceDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

const InvoiceSchema: Schema<IInvoice> = new Schema(
    {
        invoiceNumber: { type: String, required: true, unique: true },
        orderId: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
            unique: true,
        },
        partnerId: {
            type: Schema.Types.ObjectId,
            ref: 'Partner',
            required: true,
        },
        gstAmount: { type: Number, required: true },
        totalPayable: { type: Number, required: true },
        invoiceDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Invoice: Model<IInvoice> =
    mongoose.models.Invoice || mongoose.model<IInvoice>('Invoice', InvoiceSchema);

export default Invoice;
