import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,
        price: { type: Number, required: true },
        code: { type: String, required: true, unique: true },
        stock: { type: Number, required: true },
        status: { type: Boolean, default: true },
        category: String,
        thumbnails: [String]
    },
    { timestamps: true }
);

export const ProductModel = mongoose.model('Product', productSchema);