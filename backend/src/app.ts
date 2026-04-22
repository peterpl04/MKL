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

app.get("/health", (_req, res) => {
	return res.status(200).json({ status: "ok" });
});

app.get("/api/health", (_req, res) => {
	return res.status(200).json({ status: "ok" });
});

app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api", routes);

app.use(errorHandler);

export { app };
