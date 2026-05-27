import jwt from "jsonwebtoken";
import config from "../config/config.js";
import AppError from "../utils/AppError.js";


export const guestOnly = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            const token = authHeader.split(" ")[1];

            jwt.verify(token, config.ACCESS_SECRET);

            return next(new AppError("Already authenticated", 403));
        } catch { }
    }

    next();
};
