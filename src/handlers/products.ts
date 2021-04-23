import { ProductStore, Product } from "../models/ProductStore";
import { Request, Response, Application } from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const productStore = new ProductStore();

const index = async (_req: Request, _res: Response) => {
  const products = await productStore.index();
  _res.status(200).send({
    status: "success",
    data: products
  });
};

const create = async (_req: Request, _res: Response) => {
  const product: Product = _req.body;
  if (!product.name || !product.price) {
    return _res.status(400).send({
      status: "failure",
      message: "Missing name/price in request body"
    });
  }
  try {
    const newProduct = await productStore.create(product);
    _res.status(200).send({
      status: "success",
      data: newProduct
    });
  } catch (error) {
    _res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};

const show = async (_req: Request, _res: Response) => {
  const productId = parseInt(_req.params.id);
  if (!productId) {
    return _res.status(400).send({
      status: "failure",
      message: "Please send productId in path params"
    });
  }
  try {
    const product = await productStore.show(productId);
    _res.status(200).send({
      status: "success",
      data: product
    });
  } catch (error) {
    _res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};

export const mountProducts = (app: Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
};
