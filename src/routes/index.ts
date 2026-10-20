import { Router } from "express";
import authRoutes from "./auth-routes";
import productRoutes from "./product-routes";
import cartRoutes from "./cart-routes";
import orderRoutes from "./order-routes";
import paymentRoutes from "./payment-routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);
router.use("/payment", paymentRoutes);


export default router;