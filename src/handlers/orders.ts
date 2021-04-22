import { OrderStore, Order } from "../models/OrderStore";
import { Application, Request, Response } from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken";
const orderStore = new OrderStore();

const createOrder = async (_req: Request, _res: Response) => {
  const order = _req.body;
  const userId = parseInt(_req.params.userId);
  try {
    const newOrder = await orderStore.create({
      ...order,
      user_id: userId
    });
    _res.status(200).send({
      status: "success",
      data: newOrder
    });
  } catch (error) {
    _res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};

const fetchOrder = async (_req: Request, _res: Response) => {
  const userId = parseInt(_req.params.userId);
  const status = Number(_req.query.status);
  try {
    const orders = await orderStore.showOrdersByUserId(userId, status);
    _res.status(200).send({
      status: "success",
      data: orders
    });
  } catch (error) {
    _res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};

const markAsComplete = async (_req: Request, _res: Response) => {
  const orderId = parseInt(_req.params.orderId);
  try {
    await orderStore.markOrderComplete(orderId);
    _res.status(200).send({
      status: "success"
    });
  } catch (error) {
    _res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};

export const mountOrders = (app: Application) => {
  app.post("/orders/users/:userId", verifyAuthToken, createOrder);
  app.get("/orders/users/:userId", verifyAuthToken, fetchOrder);
  app.post("/orders/:orderId/markAsComplete", verifyAuthToken, markAsComplete);
};
