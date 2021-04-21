import { ProductStore } from "../ProductStore";

const productStore = new ProductStore();
const productId = 1;

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
      id: productId,
      name: "iPhone SE",
      price: 399
    };
    const addedProduct = await productStore.create(product);
    expect(addedProduct.id).toBeDefined();
  });
  it("show method should return the product", async () => {
    const product = await productStore.show(productId);
    expect(product).not.toBeNull();
  });
});
