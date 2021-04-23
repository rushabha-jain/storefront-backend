import supertest from "supertest";
import expressApp from "../../../src/server";
import cleanup from "../helpers/cleanup";
import { createRandomUser } from "../helpers/UserOps";

const request = supertest(expressApp);
let token: string | undefined;
let userId: number;

describe("Order API test", () => {
  let orderId: number;
  beforeAll(async () => {
    const newUser = await createRandomUser();
    token = newUser.token;
    userId = newUser.id as number;
  });
  afterAll(async () => {
    await cleanup();
  });
  it("Should create an order for authenticated user", async () => {
    const response = await request
      .post(`/orders/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    orderId = parseInt(response.body.data.id);
    expect(response.status).toBe(200);
  });
  it("Should not create an order for unauthenicated user", async () => {
    const response = await request.post(`/orders/users/${userId}`);
    expect(response.status).toBe(401);
  });
  it("Should fetch orders which belongs to the authenticated user", async () => {
    const response = await request
      .get(`/orders/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("Should not fetch orders which belongs to the unauthenticated user", async () => {
    const response = await request.get(`/orders/users/${userId}`);
    expect(response.status).toBe(401);
  });
  it("Should mark order complete for authenticated user", async () => {
    const response = await request
      .patch(`/orders/${orderId}/markAsComplete`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("Should not mark order complete for unauthenticated user", async () => {
    const response = await request.patch(`/orders/${orderId}/markAsComplete`);
    expect(response.status).toBe(401);
  });
  it("Should fetch all the completed task", async () => {
    const response = await request
      .get(`/orders/users/${userId}?status=1`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
