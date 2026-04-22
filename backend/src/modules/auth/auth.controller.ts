import { Request, Response } from "express";
import { loginSchema, registerSchema } from "modules/auth/auth.schemas.js";
import * as authService from "modules/auth/auth.service.js";

export async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);
  const result = await authService.register(data);

  return res.status(201).json(result);
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);
  const result = await authService.login(data);

  return res.status(200).json(result);
}

export async function me(req: Request, res: Response) {
  return res.status(200).json({
    user: req.user
  });
}
