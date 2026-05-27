import { z } from "zod";
import AppError from "../utils/AppError.js";

export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const formattedErrors = {};

        throw new AppError("Validation error", 400, z.prettifyError(result.error));
    }

    req.body = result.data;
    next();
};
