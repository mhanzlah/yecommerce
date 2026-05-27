import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { addToCart, clearCart, getCart, removeFromCart, updateCartItem } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.use(protect);

cartRouter.get("/", getCart);
cartRouter.post("/items", addToCart);
cartRouter.patch("/items/:productId", updateCartItem);
cartRouter.delete("/", removeFromCart);
cartRouter.delete("/", clearCart);

export default cartRouter;
