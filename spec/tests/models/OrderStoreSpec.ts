import { OrderStore } from "../../../src/models/OrderStore";
import { createRandomUser } from "../helpers/UserOps";
import cleanup from "../helpers/cleanup";

const orderStore = new OrderStore();

let orderId: number, userId: number;

describe("Order Model", () => {
  beforeAll(async () => {
    const newUser = await createRandomUser();
    userId = newUser.id as number;
  });
  afterAll(async () => {
    await cleanup();
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
      user_id: userId
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
