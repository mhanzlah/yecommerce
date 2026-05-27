import slugify from "slugify";

import Category from "../models/Category.js";
import AppError from "../utils/AppError.js";

export const createCategory = async (req, res) => {
    const { name, parent } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
        throw new AppError("Category with same name already exists", 409);
    }

    const slug = slugify(name);

    const category = await Category.create({ name, slug, category });

    res.status(201).json({ message: "Category created successfully", category });
};

export const getCategory = async (req, res) => {
    const { slug } = req.params;

    const category = await Category.findOne({ slug });

    if (!category) {
        throw new AppError("Category not found", 404);
    }
};
