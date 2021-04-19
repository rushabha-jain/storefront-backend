import express from "express";

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    data: [
      {
        name: "Rushabha"
      },
      {
        name: "Arihant"
      }
    ]
  });
});

export default productRouter;
