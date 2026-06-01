import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

import authRouter from "./routes/auth.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import config from "./config/config.js";

const app = express();

// app.set("trust proxy", 1);

const allowedOrigins = config.ALLOWED_ORIGINS;

app.use(
  cors({
    origin: function (origin, callback) {
      // allow REST tools / server-to-server / curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`Yecommerce service is up and running. ${config.ALLOWED_ORIGINS}`);
});

app.use("/api/auth", authRouter);

app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
// app.use("/api/cart", productRouter);

app.use(errorMiddleware);

export default app;
