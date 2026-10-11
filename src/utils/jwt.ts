import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  id: number;
  role: "USER" | "ADMIN";
}

export function generateToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: env.server.jwtExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.server.jwtSecret, options);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.server.jwtSecret) as JwtPayload;
}
