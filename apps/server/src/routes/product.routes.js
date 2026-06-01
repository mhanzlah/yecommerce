import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import upload from "../middlewares/upload.middleware.js";

const productRouter = Router();

productRouter.post(
  "/",
  protect,
  adminOnly,
  upload.fields([{ name: "image", maxCount: 1 }]),
  asyncHandler(createProduct),
);

productRouter.get("/", asyncHandler(getProducts));
productRouter.get("/:slug", asyncHandler(getProduct));
productRouter.patch(
  "/:slug",
  protect,
  adminOnly,
  upload.fields([{ name: "image", maxCount: 1 }]),
  asyncHandler(updateProduct),
);
productRouter.delete("/:slug", protect, adminOnly, asyncHandler(deleteProduct));

export default productRouter;
