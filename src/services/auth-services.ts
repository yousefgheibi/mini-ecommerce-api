import bcrypt from "bcrypt";
import { prisma } from "../config/prisma-client";
import { AppError } from "../utils/app-error";
import { LoginInput, RegisterInput } from "../validations/auth-validation";
import { generateToken } from "../utils/jwt";

const SALT_ROUNDS: number = 10;

export async function registerUser(data: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new AppError("This Email already registered! ", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      age: data.age,
      city: data.city,
      address: data.address,
      postalCode: data.postalCode,
    },
  });

  await prisma.cart.create({ data: { userId: user.id } });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function loginUser(data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError("Email/Password is invalid!", 401);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Email/Password is invalid!", 401);
  }

  const token = generateToken({ id: user.id, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
