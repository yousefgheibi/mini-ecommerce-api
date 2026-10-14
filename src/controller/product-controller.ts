import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import {
  createNewProduct,
  getAllProcuts,
  updateProductSv,
} from "../services/product-services";
import { env } from "../config/env";

export const listProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await getAllProcuts();

    res.json(products);
  },
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const imageUrl = req.file
      ? `/${env.server.uploadDir}/${req.file.filename}`
      : undefined;

    const prodcut = await createNewProduct(req.body, imageUrl);

    res.status(201).json(prodcut);
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const imageUrl = req.file
      ? `/${env.server.uploadDir}/${req.file.filename}`
      : undefined;

    const { id } = req.params;
    const product = await updateProductSv(id, req.body, imageUrl);

    res.json(product);
  },
);