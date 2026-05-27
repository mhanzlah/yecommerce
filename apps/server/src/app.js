import cors from "cors";
import cookieParser from "cookie-parser";
import express from 'express';

import authRouter from "./routes/auth.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import config from "./config/config.js";


const app = express();

app.set("trust proxy", 1);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Yecommerce service is up and running.');
})

app.use("/api/auth", authRouter);

app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", productRouter);

app.use(errorMiddleware);

export default app;
