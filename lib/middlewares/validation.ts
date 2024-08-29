import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export default function validation(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        error: "Erro de validação",
        details: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
}
