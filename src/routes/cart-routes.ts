import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { validate } from "../middlewares/validation-middleware";
import { addItemEndpoint, clearCartEndpoint, getCartEndpoint, removeItemEndpoint, updateItemEndpoint } from "../controller/cart-controller";
import { addCartItemSchema, updateCartItemSchema } from "../validations/cart-validation";



const router = Router();


router.use(authMiddleware);

router.get("/", getCartEndpoint);
router.post("/items", validate(addCartItemSchema),addItemEndpoint);
router.patch("/items/:productId", validate(updateCartItemSchema),updateItemEndpoint);
router.delete("/items/:productId",removeItemEndpoint);
router.delete("/",clearCartEndpoint );

export default router;