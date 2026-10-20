import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { checkoutEndpoint, getMyOrdeEndpoint, listMyOrdersEndpoint } from "../controller/order-controller";

const router = Router();

router.use(authMiddleware);

router.post("/checkout", checkoutEndpoint);
router.get("/my", listMyOrdersEndpoint);
router.delete("/my/:id", getMyOrdeEndpoint);

export default router;
