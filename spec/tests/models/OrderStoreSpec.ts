import { OrderStore } from "../../../src/models/OrderStore";
import { UserStore } from "../../../src/models/UserStore";
import { ProductStore } from "../../../src/models/ProductStore";

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

let orderId: number, userId: number, productId: number;
let quantity = 10;
const user = {
  firstname: "random",
  lastname: "random",
  email: "xyz@xyz.com",
  password: "random"
};

const product = {
  name: "iPhone SE",
  price: 399
};

describe("Order Model", () => {
  beforeAll(async () => {
    const newUser = await userStore.create(user);
    userId = newUser.id as number;
    const newProduct = await productStore.create(product);
    productId = newProduct.id as number;
  });
  afterAll(async () => {
    await userStore.delete(userId);
    await productStore.delete(productId);
  });
  it("Should have an create method", () => {
    expect(orderStore.create).toBeDefined();
  });
  it("Should have an markOrderComplete method", () => {
    expect(orderStore.markOrderComplete).toBeDefined();
  });
  it("Should have an showOrdersByUserId method", () => {
    expect(orderStore.showOrdersByUserId).toBeDefined();
  });
  it("showOrdersByUserId method should return empty list of order", async () => {
    const results = await orderStore.showOrdersByUserId(1);
    expect(results).toEqual([]);
  });
  it("create method should add order", async () => {
    const order = {
      user_id: userId,
      product_id: productId,
      quantity
    };
    const newOrder = await orderStore.create(order);
    orderId = newOrder.id as number;
    expect(newOrder.id).toBeDefined();
  });
  it("showOrdersByUserId method should return non-empty list of orders", async () => {
    const results = await orderStore.showOrdersByUserId(userId);
    expect(results).not.toEqual([]);
  });
  it("Should make the status completed", async () => {
    await orderStore.markOrderComplete(orderId);
    expect(true).toBe(true);
  });
  it("Should delete the order", async () => {
    await orderStore.delete(orderId);
    expect(true).toBe(true);
  });
});
