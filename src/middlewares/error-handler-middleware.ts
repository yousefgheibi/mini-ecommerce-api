import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }
  console.log(err);

  res.status(500).json({ message: "Server Error!" });
}
