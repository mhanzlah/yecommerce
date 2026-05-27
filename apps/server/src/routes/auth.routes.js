import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { guestOnly } from "../middlewares/guest.middleware.js";

import {
    login,
    logout,
    me,
    refresh,
    register,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";


const authRouter = Router();

authRouter.post("/register", guestOnly, validate(registerSchema), asyncHandler(register));
authRouter.post("/login", guestOnly, validate(loginSchema), asyncHandler(login));
authRouter.post("/logout", protect, asyncHandler(logout));
authRouter.post("/refresh", asyncHandler(refresh));
authRouter.get("/me", protect, asyncHandler(me))

export default authRouter;
