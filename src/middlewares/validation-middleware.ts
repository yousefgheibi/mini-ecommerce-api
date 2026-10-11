import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return function (req: Request, res: Response, next: NextFunction): void {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "The entered data is not valid!",
        errors: result.error.issues.map((i) => i.message),
      });

      return;
    }

    req.body = result.data;
    next();
  };
}
