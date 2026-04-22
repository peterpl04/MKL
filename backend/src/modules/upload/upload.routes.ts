import path from "node:path";
import { randomUUID } from "node:crypto";
import multer from "multer";
import { Router } from "express";
import { env } from "config/env.js";
import { ensureAuthenticated } from "middlewares/auth.js";
import { ApiError } from "utils/api-error.js";

const uploadRoutes = Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${randomUUID()}${extension}`);
  }
});

const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimes.includes(file.mimetype)) {
      cb(new ApiError(400, "Formato de imagem inválido."));
      return;
    }
    cb(null, true);
  }
});

uploadRoutes.post("/image", ensureAuthenticated, upload.single("file"), (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Arquivo não enviado.");
  }

  const fileUrl = `${env.API_BASE_URL}/uploads/${req.file.filename}`;

  return res.status(201).json({
    url: fileUrl,
    filename: req.file.filename
  });
});

export { uploadRoutes };
