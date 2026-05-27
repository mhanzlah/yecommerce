import slugify from "slugify";

import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
    const { name, description, price, sizes, category, type, isPreOrder } = req.body;

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
        throw new AppError("Product with this name already exists", 409);
    }

    const slug = slugify(name);

    const imageFile = req.files?.image?.[0];

    if (!imageFile) {
        throw new AppError("Product image is required", 400);
    }

    const uploadedImage = await cloudinary.uploader.upload(imageFile.path, { folder: "yecommerce-products" });

    const product = await Product.create({ name, slug, description, price, sizes, category, type, image: uploadedImage.secure_url, isPreOrder });

    res.status(201).json({ message: "Product created successfully", product });
};

export const getProducts = async (req, res) => {
    const products = await Product.find();

    res.json({ message: "Products retrieved successfully", products });
};

export const getProduct = async (req, res) => {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    res.json({ message: "Product retrieved successfully", product });
};

export const updateProduct = async (req, res) => {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    const { name, description, price, sizes, category, type, isPreOrder } = req.body;

    if (name && name !== product.name) {
        const existingProduct = await Product.findOne({ name });

        if (existingProduct) {
            throw new AppError("Product with this name already exists", 409);
        }
    }

    let image = product.image;

    const imageFile = req.files?.image?.[0];

    if (imageFile) {
        const uploadedImage = await cloudinary.uploader.upload(
            imageFile.path,
            { folder: "yecommerce-products" }
        );

        image = uploadedImage.secure_url;
    }

    product.name = name || product.name;
    product.slug = name ? slugify(name) : product.slug;
    product.description = description || product.description;
    product.price = price ?? product.price;
    product.sizes = sizes || product.sizes;
    product.category = category || product.category;
    product.type = type || product.type;
    product.isPreOrder =
        isPreOrder !== undefined
            ? isPreOrder
            : product.isPreOrder;

    product.image = image;

    await product.save();

    res.json({ message: "Product updated successfully", product });
};

export const deleteProduct = async (req, res) => {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    await Product.deleteOne({ slug });

    res.status(204).send();
};
