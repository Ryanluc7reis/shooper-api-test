import Joi from "joi";

export const uploadMeasureSchema = Joi.object({
  image: Joi.string().base64().required(),
  customer_code: Joi.string().required(),
  measure_datetime: Joi.date().required(),
  measure_type: Joi.string().valid("water", "gas").required(),
});
