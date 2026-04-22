import { Router } from "express";
import { authRoutes } from "modules/auth/auth.routes.js";
import { companyRoutes } from "modules/company/company.routes.js";
import { productRoutes } from "modules/product/product.routes.js";
import { uploadRoutes } from "modules/upload/upload.routes.js";

const routes = Router();

routes.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ok" });
});

routes.use("/auth", authRoutes);
routes.use("/companies", companyRoutes);
routes.use("/products", productRoutes);
routes.use("/upload", uploadRoutes);

export { routes };
