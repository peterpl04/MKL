import { NextFunction, Request, Response } from "express";
import { verifyToken } from "utils/jwt.js";
import { ApiError } from "utils/api-error.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export function ensureAuthenticated(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new ApiError(401, "Token não informado.");
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new ApiError(401, "Token inválido.");
  }

  const payload = verifyToken(token);

  req.user = {
    id: payload.sub,
    email: payload.email
  };

  return next();
}
