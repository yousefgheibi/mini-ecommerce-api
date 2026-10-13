import { Router } from "express";
import { createProduct, listProducts } from "../controller/product-controller";
import { authMiddleware } from "../middlewares/auth-middleware";
import { adminMiddleware } from "../middlewares/admin-middleware";
import { uploadProductImage } from "../middlewares/upload-middleware";
import { validate } from "../middlewares/validation-middleware";
import { createProductSchema } from "../validations/product-validations";

const router = Router();
router.get("/", listProducts);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  uploadProductImage,
  validate(createProductSchema),
  createProduct
);

export default router;
