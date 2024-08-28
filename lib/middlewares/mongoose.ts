import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI as string;

declare global {
  var mongoose: Mongoose | undefined;
}
const databaseMiddleware = async (): Promise<Mongoose | null> => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log("Connected to Database");
    return connection;
  } catch (error) {
    console.error("Error connecting to database:", error);
    return null;
  }
};
export default databaseMiddleware;
