import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import { routes } from "routes.js";
import { errorHandler } from "middlewares/error-handler.js";
import { env } from "config/env.js";

const app = express();

const defaultAllowedOrigins = [
	"http://localhost:5173",
	"http://127.0.0.1:5173",
	"https://pwdigital.up.railway.app",
	"https://captivating-imagination-production-a809.up.railway.app"
];

const localDevHosts = new Set(["localhost", "127.0.0.1", "::1"]);

function isLocalDevOrigin(origin: string) {
	try {
		const url = new URL(origin);
		return localDevHosts.has(url.hostname);
	} catch {
		return false;
	}
}

const allowedOrigins = new Set(
	env.CORS_ORIGINS
		? env.CORS_ORIGINS.split(",")
				.map((origin) => origin.trim())
				.filter(Boolean)
		: defaultAllowedOrigins
);

app.use(helmet());
app.use(
	cors({
		origin(origin, callback) {
			if (!origin || allowedOrigins.has(origin) || isLocalDevOrigin(origin)) {
				callback(null, true);
				return;
			}

			callback(new Error(`Origem não permitida pelo CORS: ${origin}`));
		}
	})
);
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
