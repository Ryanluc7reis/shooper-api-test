import { startOfMonth, endOfMonth } from "date-fns";
import Image from "./measure.model";

interface Body {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
  customer_code: string;
}

export const existMeasure = async (body: Body) => {
  const { measure_datetime, measure_type } = body;

  const measureDate = new Date(measure_datetime);
  const startDate = startOfMonth(measureDate);
  const endDate = endOfMonth(measureDate);

  const measure = await Image.findOne({
    measure_datetime: {
      $gte: startDate,
      $lte: endDate,
    },
    measure_type: measure_type,
  });

  if (measure) {
    return true;
  }
  return false;
};
