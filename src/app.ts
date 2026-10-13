import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index";
import { errorHandler } from "./middlewares/error-handler-middleware";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.use(errorHandler);
