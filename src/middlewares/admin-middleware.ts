import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { verifyToken } from "../utils/jwt";

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.user || req.user.role !== "ADMIN") {
    throw new AppError("You do not have access to this route !", 403);
  }

  next();
}
