import { Request, Response } from "express";
import { upsertCompanySchema } from "modules/company/company.schemas.js";
import * as companyService from "modules/company/company.service.js";

export async function upsertMyCompany(req: Request, res: Response) {
  const data = upsertCompanySchema.parse(req.body);
  const company = await companyService.upsertCompany({
    userId: req.user!.id,
    ...data
  });

  return res.status(200).json(company);
}

export async function getMyCompany(req: Request, res: Response) {
  const company = await companyService.getMyCompany(req.user!.id);
  return res.status(200).json(company);
}

export async function getPublicCompany(req: Request, res: Response) {
  const { slug } = req.params;
  const company = await companyService.getPublicCompanyBySlug(slug, {
    ip: req.ip,
    userAgent: req.headers["user-agent"]
  });

  return res.status(200).json(company);
}

export async function getMyAnalytics(req: Request, res: Response) {
  const analytics = await companyService.getCompanyAnalytics(req.user!.id);
  return res.status(200).json(analytics);
}
