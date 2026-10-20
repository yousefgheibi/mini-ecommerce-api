import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { checkout, getOrdersByUserId, getOrderByIdForUser } from "../services/order-services";

export const checkoutEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await checkout(req.user!.id);
    res.status(201).json(order);
  },
);

export const listMyOrdersEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await getOrdersByUserId(req.user!.id);
    res.json(orders);
  },
);

export const getMyOrdeEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await getOrderByIdForUser(req.user!.id);
    res.json(orders);
  },
);
