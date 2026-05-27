import mongoose from "mongoose";

import { comparePassword, hashPassword } from "../utils/password.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    avatar: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await hashPassword(this.password);
});

userSchema.pre("save", async function () {
    if (!this.avatar) {
        this.avatar = `https://api.dicebear.com/9.x/initials/svg?seed=${this.name}`;
    }
});

userSchema.methods.comparePassword = async function (entered) {
    return await comparePassword(entered, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
