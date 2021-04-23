import supertest from "supertest";
import expressApp from "../../../src/server";
import { createRandomProduct, cleanup, createRandomOrder } from "../utils";

const request = supertest(expressApp);

describe("Order Product API test", () => {
  let orderId: number;
  let token: string | undefined;
  let productId: number;

  beforeAll(async () => {
    const newProduct = await createRandomProduct();
    productId = newProduct.id as number;
    const newOrder = await createRandomOrder();
    token = newOrder.user.token;
    orderId = newOrder.id as number;
  });

  afterAll(async () => {
    await cleanup();
  });

  it("Should add product in the order for authenticated user", async () => {
    const response = await request
      .post(`/orders/${orderId}/products`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        product_id: productId,
        quantity: 10
      });
    expect(response.status).toBe(200);
  });
  it("Should not add product in the order for unauthenticated user", async () => {
    const response = await request.post(`/orders/${orderId}/products`).send({
      product_id: productId,
      quantity: 10
    });
    expect(response.status).toBe(401);
  });
  it("Should fetch list of products in the order for authenticated user", async () => {
    const response = await request
      .get(`/orders/${orderId}/products`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("Should not fetch list of products in the order for unauthenticated user", async () => {
    const response = await request.get(`/orders/${orderId}/products`);
    expect(response.status).toBe(401);
  });
});
