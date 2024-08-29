import mongoose, { Document, Model, Schema } from "mongoose";

interface Measure extends Document {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
}

const MeasureSchema: Schema<Measure> = new mongoose.Schema({
  measure_uuid: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, required: true },
  has_confirmed: { type: Boolean, required: true },
  image_url: { type: String, required: true },
});

const Measure: Model<Measure> =
  mongoose.models.Measure || mongoose.model<Measure>("Measure", MeasureSchema);

export default Measure;
