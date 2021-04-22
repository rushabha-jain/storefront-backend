import supertest from "supertest";
import expressApp from "../src/server";

const request = supertest(expressApp);

describe("End point tests", () => {
  describe("Products API test", () => {
    it("Should return the list of products", async () => {
      const response = await request.get("/products");
      expect(response.status).toBe(200);
    });
  });
});
