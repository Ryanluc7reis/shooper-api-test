import { Router, Request, Response } from "express";
import validation from "../../../lib/middlewares/validation";
import {
  existMonthMeasure,
  createMeasure,
  existReadingMeasure,
  existConfirmedReading,
  getMeasures,
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

      const geminiResponse = await uploadImage();
      if (geminiResponse) {
        await createMeasure(
          geminiResponse.uri,
          geminiResponse.guid,
          geminiResponse.numberRead,
          geminiResponse.stringRead
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
      res.status(500).send((err as Error).message);
    }
  }
);

router.get("/:custumerCode/list", async (req: Request, res: Response) => {
  try {
    const { custumerCode } = req.params;
    const { measure_type } = req.query;

    const readings = await getMeasures(custumerCode, measure_type as string);
    if (!readings) {
      return res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitida",
      });
    }

    if (readings && readings.length > 0) {
      return res.status(200).json({
        customer_code: custumerCode,
        measures: readings,
      });
    }
    return res.status(404).json({
      error_code: "MEASURES_NOT_FOUND",
      error_description: "Nenhuma leitura encontrada",
    });
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

export default router;
