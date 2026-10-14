import { Router } from "express";
import { createProductEndpoint, updateProductEndpoint, listProductsEndpoint, getProductDetailEndpoint, deleteProductEndpoint } from "../controller/product-controller";
import { authMiddleware } from "../middlewares/auth-middleware";
import { adminMiddleware } from "../middlewares/admin-middleware";
import { uploadProductImage } from "../middlewares/upload-middleware";
import { validate } from "../middlewares/validation-middleware";
import { createProductSchema, updateProductSchema } from "../validations/product-validations";

const router = Router();
router.get("/", listProductsEndpoint);
router.get("/:id", getProductDetailEndpoint);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  uploadProductImage,
  validate(createProductSchema),
  createProductEndpoint
);

router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  uploadProductImage,
  validate(updateProductSchema),
  updateProductEndpoint
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProductEndpoint
);

export default router;
