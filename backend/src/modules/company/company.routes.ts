import { Router } from "express";
import { ensureAuthenticated } from "middlewares/auth.js";
import * as companyController from "modules/company/company.controller.js";
import { asyncHandler } from "utils/async-handler.js";

const companyRoutes = Router();

companyRoutes.get("/public/:slug", asyncHandler(companyController.getPublicCompany));
companyRoutes.get("/me", ensureAuthenticated, asyncHandler(companyController.getMyCompany));
companyRoutes.post("/me", ensureAuthenticated, asyncHandler(companyController.upsertMyCompany));
companyRoutes.get("/me/analytics", ensureAuthenticated, asyncHandler(companyController.getMyAnalytics));

export { companyRoutes };
