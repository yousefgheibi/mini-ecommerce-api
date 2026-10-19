import { z } from "zod";

export const addCartItemSchema = z.object({
  productId: z.number().int().positive("شناسه محصول نامعتبر است."),
  quantity: z.number().int().positive("تعداد باید حداقل ۱ باشد").default(1),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0, "تعداد نمی تواند منفی باشد"),
});

export type AddCartItemInput = z.infer<typeof addCartItemSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
