import slugify from "slugify";

import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";
import cloudinary from "../config/cloudinary.js";

import Category from "../models/Category.js";

export const createProduct = async (req, res) => {
  const { name, description, price, sizes, category, type, isPreOrder } =
    req.body;

  const existingProduct = await Product.findOne({ name });

  if (existingProduct) {
    throw new AppError("Product with this name already exists", 409);
  }

  const slug = slugify(name);

  const imageFile = req.files?.image?.[0];

  if (!imageFile) {
    throw new AppError("Product image is required", 400);
  }

  const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
    folder: "yecommerce-products",
  });

  const product = await Product.create({
    name,
    slug,
    description,
    price,
    sizes,
    category,
    type,
    image: uploadedImage.secure_url,
    isPreOrder,
  });

  res.status(201).json({ message: "Product created successfully", product });
};

export const getProducts = async (req, res) => {
  const { category, price, sort, search } = req.query;

  let filter = {};

  if (category) {
    const existingCategory = await Category.findOne({
      slug: category.toLowerCase(),
    });

    if (!existingCategory) {
      throw new AppError("Category not found", 404);
    }

    if (existingCategory.parent) {
      filter.category = existingCategory._id;
    } else {
      const subCategories = await Category.find({
        parent: existingCategory._id,
      }).select("_id");

      const categoryIds = [
        existingCategory._id,
        ...subCategories.map((cat) => cat._id),
      ];

      filter.category = { $in: categoryIds };
    }
  }

  if (price === "under_1000") {
    filter.price = { $lt: 1000 };
  }

  if (price === "under_10000") {
    filter.price = { $lt: 10000 };
  }

  if (price === "under_20000") {
    filter.price = { $lt: 20000 };
  }

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  let sortOption = {};

  if (sort === "price_low") {
    sortOption.price = 1;
  }

  if (sort === "price_high") {
    sortOption.price = -1;
  }

  if (sort === "az") {
    sortOption.name = 1;
  }

  if (sort === "za") {
    sortOption.name = -1;
  }

  if (Object.keys(sortOption).length === 0) {
    sortOption.createdAt = -1;
  }

  const products = await Product.find(filter).sort(sortOption);

  res.json(products);
};

export const getProduct = async (req, res) => {
  const { slug } = req.params;

  const product = await Product.findOne({ slug });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.json(product);
};

export const updateProduct = async (req, res) => {
  const { slug } = req.params;

  const product = await Product.findOne({ slug });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const { name, description, price, sizes, category, type, isPreOrder } =
    req.body;

  if (name && name !== product.name) {
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      throw new AppError("Product with this name already exists", 409);
    }
  }

  let image = product.image;

  const imageFile = req.files?.image?.[0];

  if (imageFile) {
    const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
      folder: "yecommerce-products",
    });

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
    isPreOrder !== undefined ? isPreOrder : product.isPreOrder;

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
