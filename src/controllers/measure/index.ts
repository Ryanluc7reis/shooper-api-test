import { Router, Request, Response } from "express";
import validation from "../../../lib/middlewares/validation";
import {
  existMonthMeasure,
  createMeasure,
  existReadingMeasure,
  existConfirmedReading,
} from "../../modules/measure/measure.service";
import {
  uploadMeasureSchema,
  confirmMeasureSchema,
} from "../../modules/measure/measure.schema";
import { uploadImage } from "../../modules/gemini/gemini.service";

const router = Router();

router.post(
  "/upload",
  validation(uploadMeasureSchema),
  async (req: Request, res: Response) => {
    try {
      const existReading = await existMonthMeasure(req.body);
      if (existReading) {
        return res.status(409).json({
          error_code: "DOUBLE_REPORT",
          error_description: "Leitura do mês já realizada",
        });
      }
      //const { image } = req.body;
      const geminiResponse = await uploadImage();
      if (geminiResponse) {
        await createMeasure(
          req.body,
          geminiResponse.uri,
          geminiResponse.guid,
          geminiResponse.numberRead
        );
        return res.status(200).json({
          image_url: geminiResponse.uri,
          measure_value: geminiResponse.numberRead,
          measure_uuid: geminiResponse.guid,
        });
      }
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  }
);

router.patch(
  "/confirm",
  validation(confirmMeasureSchema),
  async (req: Request, res: Response) => {
    try {
      const reading = await existConfirmedReading(req.body);
      if (reading) {
        return res.status(409).json({
          error_code: "CONFIRMATION_DUPLICATE",
          error_description: "Leitura do mês já realizada",
        });
      }

      const newReading = await existReadingMeasure(req.body);
      if (newReading) {
        return res.status(200).json({
          success: "true",
        });
      }

      return res.status(404).json({
        error_code: "MEASURE_NOT_FOUND",
        error_description: "Leitura do não encontrada",
      });
    } catch (err) {
      res.status(400).send((err as Error).message);
    }
  }
);

export default router;
