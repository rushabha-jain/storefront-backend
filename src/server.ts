import express from "express";
import { mountProducts } from "./handlers/products";
import { mountUsers } from "./handlers/users";
import dotenv from "dotenv";
import { mountOrders } from "./handlers/orders";
import { mountOrderProduct } from "./handlers/orderProduct";

dotenv.config();

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(express.json());

mountProducts(app);
mountUsers(app);
mountOrders(app);
mountOrderProduct(app);

app.listen(3000, function() {
  console.log(`starting app on: ${address}`);
});

export default app;
