import { Router } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import { createCategory, getCategory } from "../controllers/category.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const categoryRouter = Router();

categoryRouter.use(protect);
categoryRouter.use(adminOnly);

categoryRouter.post("/", asyncHandler(createCategory));
categoryRouter.get("/:slug", asyncHandler(getCategory));

export default categoryRouter;
