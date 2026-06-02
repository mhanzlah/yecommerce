import slugify from "slugify";

import Category from "../models/Category.js";
import AppError from "../utils/AppError.js";

export const getCategories = async (req, res) => {
  const all = await Category.find().select("slug");

  res.json(all);
};

export const getParentCategories = async (req, res) => {
  const categories = await Category.find({ parent: null });

  res.json(categories);
};

export const createCategory = async (req, res) => {
  const { name, parent } = req.body;

  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    throw new AppError("Category with same name already exists", 409);
  }

  const slug = slugify(name);

  const category = await Category.create({ name, slug, parent });

  res.status(201).json(category);
};

export const getCategory = async (req, res) => {
  const { slug } = req.params;

  const category = await Category.findOne({ slug });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  res.json(category);
};

export const getSubCategories = async (req, res) => {
  const { slug } = req.params;

  const parentCategory = await Category.findOne({ slug });

  if (!parentCategory) {
    throw new AppError("Category not found", 404);
  }

  const subCategories = await Category.find({ parent: parentCategory._id });

  res.json(subCategories);
};
