import express from "express";
import { ProductStore } from "../../models/ProductStore";
const productRouter = express.Router();

const productStore = new ProductStore();

productRouter.get("/", async (req, res) => {
  try {
    const products = await productStore.index();
    res.status(200).send({
      status: "success",
      data: products
    });
  } catch (error) {
    res.status(500).send();
  }
});

export default productRouter;
