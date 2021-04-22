import { ProductStore } from "../ProductStore";

const productStore = new ProductStore();
let productId: number;

describe("Product Model", () => {
  it("Should have an index method", () => {
    expect(productStore.index).toBeDefined();
  });
  it("Should have an create method", () => {
    expect(productStore.create).toBeDefined();
  });
  it("Should have an show method", () => {
    expect(productStore.show).toBeDefined();
  });
  it("index method should return empty list of products", async () => {
    const results = await productStore.index();
    expect(results).toEqual([]);
  });
  it("create method should add products", async () => {
    const product = {
      name: "iPhone SE",
      price: 399
    };
    const newProduct = await productStore.create(product);
    productId = newProduct.id as number;
    expect(newProduct.id).toBeDefined();
  });
  it("show method should return the product", async () => {
    const product = await productStore.show(productId);
    expect(product).not.toBeNull();
  });
});
