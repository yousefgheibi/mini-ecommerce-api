import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { registerUser, loginUser} from "../services/auth-services";

export const registerEndpoint = asyncHandler(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);

  res.status(201).json(user);
});

export const loginEndpoint = asyncHandler(async (req: Request, res: Response) => {
  const user = await loginUser(req.body);

  res.json(user);
});
