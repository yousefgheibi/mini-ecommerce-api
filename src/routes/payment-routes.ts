import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { validate } from "../middlewares/validation-middleware";
import { payOrderSchema } from "../validations/payment-validation";
import { payOrderEndpoint } from "../controller/payment-controller";



const router = Router();

router.use(authMiddleware);

router.post("/:orderId/pay", validate(payOrderSchema), payOrderEndpoint);

export default router;