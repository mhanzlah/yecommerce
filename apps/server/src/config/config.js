import dotenv from "dotenv";

dotenv.config();

const requiredVars = [
  "MONGO_URI",
  "ACCESS_SECRET",
  "REFRESH_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`${key} is missing in environment`);
  }
});

const config = {
  ALLOWED_ORIGINS:
    process.env.ALLOWED_ORIGINS.split(",") || "http:localhost:5173",
  PORT: process.env.PORT || 3000,
  ENVIRONMENT: process.env.ENVIRONMENT || "development",
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  ACCESS_EXPIRES: process.env.ACCESS_EXPIRES || "10m",
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  REFRESH_EXPIRES: process.env.REFRESH_EXPIRES || "7d",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default config;
