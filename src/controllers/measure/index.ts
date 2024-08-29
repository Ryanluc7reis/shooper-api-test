import { Router, Request, Response } from "express";
import validation from "../../../lib/middlewares/validation";
import { existMeasure } from "../../modules/measure/measure.service";
import { uploadMeasureSchema } from "../../modules/measure/measure.schema";
import { uploadImage } from "../../modules/gemini/gemini.service";

const router = Router();

router.post(
  "/upload",
  validation(uploadMeasureSchema),
  async (req: Request, res: Response) => {
    try {
      const exist = await existMeasure(req.body);
      if (exist) {
        return res.status(409).json({
          error_code: "DOUBLE_REPORT",
          error_description: "Leitura do mês já realizada",
        });
      }
      //const { image } = req.body;
      const geminiResponse = await uploadImage();
      if (geminiResponse) {
        return res.status(200).json({
          image_url: geminiResponse.uri,
          measure_value: geminiResponse.numberRead,
          measure_uuid: geminiResponse.guid,
        });
      }

      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos",
      });
    } catch (err) {
      res.status(400).send((err as Error).message);
    }
  }
);

export default router;
