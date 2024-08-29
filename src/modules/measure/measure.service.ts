import { startOfMonth, endOfMonth } from "date-fns";
import Measure from "./measure.model";

interface Body {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  confirmed_value: number;
  has_confirmed: boolean;
  image_url: string;
  customer_code: string;
}
export const createMeasure = async (
  body: Body,
  uri: string,
  uuid: string,
  numberRead: number
) => {
  const { measure_type } = body;
  const newImage = await Measure.create({
    measure_uuid: uuid,
    measure_value: numberRead,
    measure_datetime: new Date(),
    measure_type,
    has_confirmed: false,
    image_url: uri,
  });
  return newImage;
};

export const existConfirmedReading = async (body: Body) => {
  const { measure_uuid, confirmed_value } = body;
  const confirmedMeasure = await Measure.findOne({
    measure_uuid: measure_uuid,
    measure_value: confirmed_value,
    has_confirmed: true,
  });

  if (confirmedMeasure) return true;
  return false;
};

export const existMonthMeasure = async (body: Body) => {
  const { measure_datetime, measure_type } = body;

  const measureDate = new Date(measure_datetime);
  const startDate = startOfMonth(measureDate);
  const endDate = endOfMonth(measureDate);

  const measure = await Measure.findOne({
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

export const existReadingMeasure = async (body: Body) => {
  const { measure_uuid, confirmed_value } = body;

  const measure = await Measure.findOne({
    measure_uuid: measure_uuid,
    measure_value: confirmed_value,
    has_confirmed: false,
  });

  if (measure !== null) {
    await Measure.findOneAndUpdate(
      {
        measure_uuid: measure_uuid,
        measure_value: confirmed_value,
      },
      {
        has_confirmed: true,
      },
      {
        new: true,
      }
    );
    return true;
  }
  const newMeasure = await Measure.findOneAndUpdate(
    {
      measure_uuid: measure_uuid,
    },
    {
      measure_value: confirmed_value,
    },
    {
      new: true,
    }
  );

  return newMeasure;
};
