import { Application, Request, Response } from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken";
import { OrderProductStore, OrderProduct } from "../models/OrderProductStore";

const orderProductStore = new OrderProductStore();

const getProductsInOrder = async (_req: Request, _res: Response) => {
  const orderId = parseInt(_req.params.orderId);
  if (!orderId) {
    return _res.status(400).send({
      status: "failure",
      message: "Please send orderId in path params"
    });
  }
  try {
    const products = await orderProductStore.getProductsByOrderId(orderId);
    _res.status(200).send({
      status: "success",
      data: products
    });
  } catch (error) {
    _res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};

const addProductInOrder = async (_req: Request, _res: Response) => {
  const orderId = parseInt(_req.params.orderId);
  if (!orderId) {
    return _res.status(400).send({
      status: "failure",
      message: "Please send orderId in path params"
    });
  }
  const orderProduct: OrderProduct = {
    order_id: orderId,
    ..._req.body
  };
  if (
    !orderProduct.order_id ||
    !orderProduct.product_id ||
    !orderProduct.quantity
  ) {
    return _res.status(400).send({
      status: "failure",
      message: "Missing order_id/product_id/quantity in request body"
    });
  }

  if (orderProduct.quantity <= 0) {
    return _res.status(400).send({
      status: "failure",
      message: "Invalid quantity"
    });
  }

  try {
    const newOrderProduct = await orderProductStore.create(orderProduct);
    _res.status(200).send({
      status: "success",
      data: newOrderProduct
    });
  } catch (error) {
    _res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};

export const mountOrderProduct = (app: Application) => {
  app.get("/orders/:orderId/products", verifyAuthToken, getProductsInOrder);
  app.post("/orders/:orderId/products", verifyAuthToken, addProductInOrder);
};
