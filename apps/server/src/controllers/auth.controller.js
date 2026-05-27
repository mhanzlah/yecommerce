import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken, REFRESH_TOKEN_OPTIONS, sendRefreshTokenCookie } from "../utils/token.js";
import config from "../config/config.js";
import AppError from "../utils/AppError.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });;

    if (existingUser) {
        throw new AppError("Email already taken");
    }

    const user = await User.create({ name, email, password });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    sendRefreshTokenCookie(res, refreshToken);

    return res.status(201).json({
        accessToken, user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError("Email or password is incorrect");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new AppError("Email or password is incorrect");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    sendRefreshTokenCookie(res, refreshToken);

    return res.json({
        accessToken, user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }
    });
};

export const refresh = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        throw new AppError("Unauthorized", 401);
    }

    let decoded;
    try {
        decoded = jwt.verify(token, config.REFRESH_SECRET);
    } catch (error) {
        throw new AppError("Forbidden", 403);
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
        throw new AppError("Forbidden", 403);
    }

    const newAccessToken = generateAccessToken(user._id);

    return res.json({ accessToken: newAccessToken });
};

export const logout = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (token) {
        await User.findOneAndUpdate(
            { refreshToken: token },
            { refreshToken: null }
        );
    }

    res.clearCookie("refreshToken", REFRESH_TOKEN_OPTIONS);

    return res.json({ message: "Logged out successfully" });
};

export const me = async (req, res) => {
    return res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
    });
};
