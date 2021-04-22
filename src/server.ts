import express from "express";
import { mountProducts } from "./handlers/products";
import { mountUsers } from "./handlers/users";
import dotenv from "dotenv";

const env = process.env.NODE_ENV;

if (env === "test") {
  dotenv.config({
    path: "./test.env"
  });
} else {
  dotenv.config({
    path: "./dev.env"
  });
}

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(express.json());

mountProducts(app);
mountUsers(app);

app.listen(3000, function() {
  console.log(`starting app on: ${address}`);
});

export default app;
