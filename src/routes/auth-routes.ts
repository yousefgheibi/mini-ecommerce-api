import { Router } from "express";
import { registerEndpoint, loginEndpoint } from "../controller/auth-controller";
import { validate } from "../middlewares/validation-middleware";
import { registerSchema, loginSchema } from "../validations/auth-validation";

const router = Router();

router.post("/register", validate(registerSchema), registerEndpoint);
router.post("/login", validate(loginSchema), loginEndpoint);

export default router;
