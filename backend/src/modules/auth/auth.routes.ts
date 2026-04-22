import { Router } from "express";
import { ensureAuthenticated } from "middlewares/auth.js";
import * as authController from "modules/auth/auth.controller.js";
import { asyncHandler } from "utils/async-handler.js";

const authRoutes = Router();

authRoutes.post("/register", asyncHandler(authController.register));
authRoutes.post("/login", asyncHandler(authController.login));
authRoutes.get("/me", ensureAuthenticated, asyncHandler(authController.me));

export { authRoutes };
