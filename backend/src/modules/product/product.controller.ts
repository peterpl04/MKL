import { Request, Response } from "express";
import { createProductSchema, updateProductSchema } from "modules/product/product.schemas.js";
import * as productService from "modules/product/product.service.js";

export async function createProduct(req: Request, res: Response) {
  const data = createProductSchema.parse(req.body);
  const product = await productService.createProduct(req.user!.id, data);
  return res.status(201).json(product);
}

export async function listMyProducts(req: Request, res: Response) {
  const products = await productService.listMyProducts(req.user!.id);
  return res.status(200).json(products);
}

export async function updateProduct(req: Request, res: Response) {
  const data = updateProductSchema.parse(req.body);
  const product = await productService.updateProduct(req.user!.id, req.params.id, data);
  return res.status(200).json(product);
}

export async function deleteProduct(req: Request, res: Response) {
  await productService.deleteProduct(req.user!.id, req.params.id);
  return res.status(204).send();
}
