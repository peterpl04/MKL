import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import { routes } from "routes.js";
import { errorHandler } from "middlewares/error-handler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api", routes);

app.use(errorHandler);

export { app };
