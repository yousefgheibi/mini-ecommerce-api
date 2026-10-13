import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "The name must be at least 3 chars!"),
  email: z.string().email("The email is invalid!"),
  password: z.string().min(6, "The password must be at least 6 chars!"),
  age: z.number().int().positive().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("The email is invalid!"),
  password: z.string().min(6, "The password must be at least 6 chars!"),
});
 

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;