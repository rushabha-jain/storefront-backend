import supertest from "supertest";
import expressApp from "../../../src/server";
import cleanup from "../helpers/cleanup";

const request = supertest(expressApp);
let token: string | undefined;
let userId: number;

describe("Users API test", () => {
  afterAll(async () => {
    await cleanup();
  });
  const email = "random@email.com";
  const password = "random";
  it("Should signup user", async () => {
    const response = await request.post("/users/signup").send({
      email,
      password,
      firstname: "First",
      lastname: "Last"
    });
    userId = parseInt(response.body.data.id);
    expect(response.status).toBe(200);
  });
  it("Should not signup user for invalid data", async () => {
    const response = await request.post("/users/signup").send({
      email,
      password
    });
    expect(response.status).toBe(400);
  });
  it("Should not login user for missing password", async () => {
    const response = await request.post("/users/login").send({
      email
    });
    expect(response.status).toBe(400);
  });
  it("Should not login user for missing email", async () => {
    const response = await request.post("/users/login").send({
      password
    });
    expect(response.status).toBe(400);
  });
  it("Should not login for invalid email", async () => {
    const response = await request.post("/users/signup").send({
      email: "xyz",
      password
    });
    expect(response.status).toBe(400);
  });
  it("Should not login for invalid password", async () => {
    const response = await request.post("/users/signup").send({
      email,
      password: "xyz"
    });
    expect(response.status).toBe(400);
  });
  it("Should login user", async () => {
    const response = await request.post("/users/login").send({
      email,
      password
    });
    token = response.body.token;
    expect(response.status).toBe(200);
  });
  it("Should return the list of users", async () => {
    const response = await request
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("Should return the user detail for authenticated user", async () => {
    const response = await request
      .get("/users/" + userId)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("Should not return the user detail for unauthenticated user", async () => {
    const response = await request.get("/users/" + userId);
    expect(response.status).toBe(401);
  });
});
