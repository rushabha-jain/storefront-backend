import { Application, Request, Response } from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken";
import { OrderProductStore, OrderProduct } from "../models/OrderProductStore";

const orderProductStore = new OrderProductStore();

const getProductsInOrder = async (_req: Request, _res: Response) => {
  const orderId = parseInt(_req.params.orderId);
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
  const orderProduct: OrderProduct = {
    order_id: orderId,
    ..._req.body
  };
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
