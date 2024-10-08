import express, { Application } from "express";
import bodyParser from "body-parser";
import databaseMiddleware from "../lib/middlewares/mongoose.ts";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";

dotenv.config();
databaseMiddleware();

import MeasuresRoutes from "./controllers/measure/index.ts";

const app: Application = express();
const port: number | string = process.env.PORT || 4444;

const corsConfig: CorsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", MeasuresRoutes);

app.listen(port, () => console.log(`App rodando em http://localhost:${port}`));
