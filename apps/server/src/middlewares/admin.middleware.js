import AppError from "../utils/AppError.js";

export const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new AppError("Forbidded", 403))
    }

    next();
};
