import supertest from "supertest";
import expressApp from "../src/server";

const request = supertest(expressApp);

describe("End point tests", () => {
  describe("Products API test", () => {
    it("Should return the list of products", async done => {
      const response = await request.get("/api/v1/products");
      expect(response.status).toBe(200);
      done();
    });
  });
});
