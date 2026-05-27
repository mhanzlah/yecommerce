import jwt from "jsonwebtoken";

import config from "../config/config.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const protect = async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Unauthorized", 401));
    }

    try {
        const decoded = jwt.verify(token, config.ACCESS_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return next(new AppError("User not found", 404));
        }

        req.user = user;

        next();
    } catch (error) {
        return next(new AppError("Invalid or expired token", 401));
    }
};