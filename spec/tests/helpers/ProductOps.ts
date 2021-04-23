import { ProductStore, Product } from "../../../src/models/ProductStore";

const productStore = new ProductStore();

export async function createRandomProduct(): Promise<Product> {
  const product = {
    name: "iPhone SE",
    price: 399
  };
  const newProduct = await productStore.create(product);
  return newProduct;
}