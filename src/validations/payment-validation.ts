import { z } from "zod";

export const payOrderSchema = z.object({
  forceFail: z.boolean().optional(),
});


export type payOrderInput = z.infer<typeof payOrderSchema>;