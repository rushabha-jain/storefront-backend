import express from "express";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config({
  path: "../dev.env"
});

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(express.json());
app.use("/api/v1", routes);

app.listen(3000, function() {
  console.log(`starting app on: ${address}`);
});

export default app;
