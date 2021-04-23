import supertest from "supertest";
import expressApp from "../../../src/server";
import cleanup from "../helpers/cleanup";
import { createRandomUser } from "../helpers/UserOps";

const request = supertest(expressApp);
let token: string | undefined;

describe("Products API test", () => {
  let productId: number;
  beforeAll(async () => {
    const newUser = await createRandomUser();
    token = newUser.token;
  });
  afterAll(async () => {
    await cleanup();
  });
  it("Should return the list of products", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });
  it("Should create new product for authenticated user", async () => {
    const response = await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "iPhone SE",
        price: 399
      });
    productId = parseInt(response.body.data.id);
    expect(response.status).toBe(200);
  });
  it("Should not create new product for unauthenticated user", async () => {
    const response = await request.post("/products").send({
      name: "iPhone SE",
      price: 399
    });
    expect(response.status).toBe(401);
  });
  it("Should get product detail", async () => {
    const response = await request.get("/products/" + productId).send({
      name: "iPhone SE",
      price: 399
    });
    expect(response.status).toBe(200);
  });
});
