import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized !", 401);
  }

  const token = authHeader.split(" ")[1];

     try{
        req.user = verifyToken(token);
        next();
    }
    catch{
        throw new AppError("Token is expired/invalid!",401);
    }
}
