import { Router } from "express";
import { ensureAuthenticated } from "middlewares/auth.js";
import * as productController from "modules/product/product.controller.js";
import { asyncHandler } from "utils/async-handler.js";

const productRoutes = Router();

productRoutes.use(ensureAuthenticated);
productRoutes.get("/", asyncHandler(productController.listMyProducts));
productRoutes.post("/", asyncHandler(productController.createProduct));
productRoutes.patch("/:id", asyncHandler(productController.updateProduct));
productRoutes.delete("/:id", asyncHandler(productController.deleteProduct));

export { productRoutes };
