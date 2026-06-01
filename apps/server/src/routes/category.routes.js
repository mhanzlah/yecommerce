import { Router } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import {
  createCategory,
  getCategory,
  getParentCategories,
  getSubCategories,
} from "../controllers/category.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const categoryRouter = Router();

categoryRouter.get("/parent", asyncHandler(getParentCategories));
categoryRouter.post("/", protect, adminOnly, asyncHandler(createCategory));
categoryRouter.get("/:slug", asyncHandler(getCategory));
categoryRouter.get("/subcategories/:slug", asyncHandler(getSubCategories));

export default categoryRouter;
