import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import {
  getCartByUserId,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} from "../services/cart-services";

export const getCartEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const cart = await getCartByUserId(req.user!.id);
    res.json(cart);
  },
);

export const addItemEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;
    const item = await addItemToCart(req.user!.id, productId, quantity);
    res.status(201).json(item);
  },
);

export const updateItemEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = Number(req.params.productId);
    const { quantity } = req.body;
    const item = await updateItemQuantity(req.user!.id, productId, quantity);
    res.json(item ?? { message: "جنس مورد نظر از سبد حذف شد!" });
  },
);

export const removeItemEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = Number(req.params.productId);
    await removeItemFromCart(req.user!.id, productId);
    res.status(204).send();
  },
);

export const clearCartEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    await clearCart(req.user!.id);
    res.status(204).send();
  },
);
