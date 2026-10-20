import { payForOrder } from "../services/payment-services";
import { asyncHandler } from "../utils/async-handler";
import { Request, Response } from "express";

export const payOrderEndpoint = asyncHandler(
  async (req: Request, res: Response) => {
    const orderId = Number(req.params.orderId);
    const {forceFail} = req.body;

    const result = await payForOrder(req.user!.id, orderId, forceFail);

    // پرداخت ناموفق :‌402
    res.status(result.success ? 200 : 402).json(result);
  },
);
