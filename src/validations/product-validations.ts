import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "نام محصول حداقل باید ۲ حرف باشد."),
  description: z.string().optional(),
  price: z.coerce.number().positive("قیمت باید عددی مثبت باشد."),
  stock: z.coerce
    .number()
    .int()
    .min(0, "موجودی نمی تواند منفی باشد.")
    .default(0),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
