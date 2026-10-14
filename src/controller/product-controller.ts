import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import {
  createNewProduct,
  deleteProduct,
  getAllProcuts,
  getProductDetail,
  updateProduct,
} from "../services/product-services";
import { env } from "../config/env";

export const listProductsEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await getAllProcuts();

    res.json(products);
  },
);

export const  getProductDetailEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductDetail(+id);

    res.json(product);
  },
);

export const createProductEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const imageUrl = req.file
      ? `/${env.server.uploadDir}/${req.file.filename}`
      : undefined;

    const prodcut = await createNewProduct(req.body, imageUrl);

    res.status(201).json(prodcut);
  },
);

export const updateProductEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const imageUrl = req.file
      ? `/${env.server.uploadDir}/${req.file.filename}`
      : undefined;

    const { id } = req.params;
    const product = await updateProduct(+id, req.body, imageUrl);

    res.json(product);
  },
);

export const  deleteProductEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await deleteProduct(+id);

    res.json(product);
  },
);
