import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    sizes: {
        type: [
            {
                type: String,
                enum: ["S", "M", "L", "XL", "XXL"],
            }
        ],
        default: [],
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true,
    },

    image: {
        type: String,
    },

    type: {
        type: String,
    },

    isPreOrder: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
