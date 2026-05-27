import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";

export const getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id })
        .populate("items.product");

    if (!cart) {
        return res.json({
            items: [],
        });
    }

    res.json(cart);
};

export const addToCart = async (req, res) => {
    const { productId, quantity, size } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
        cart = await Cart.create({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find((i) => i.product.toString() === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.size = size || existingItem.size;
    } else {
        cart.items.push({
            product: producdId,
            quantity,
            size,
        });
    }

    await cart.save();

    res.json(cart);
};

export const updateCartItem = async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const item = cart.items.find((i) => i.product.toString() === productId);

    if (!item) {
        throw new AppError("Product not found", 404);
    }

    const { quantity } = req.body;

    item.quantity = quantity;

    await cart.save();

    res.json(cart);
};

export const removeFromCart = async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);

    await cart.save();

    res.json(cart);
};

export const clearCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id })
        .populate("items.product");

    if (!cart) {
        return res.json({
            items: [],
        });
    }

    cart.items = [];
    await cart.save();

    res.json(cart);
};