import { UserStore } from "../../../src/models/UserStore";
import cleanup from "../helpers/cleanup";

const userStore = new UserStore();
let userId: number;
const userEmail = "somerandomemail";
const userPassword = "somerandomepassword";

describe("Users Model", () => {
  afterAll(async () => {
    await cleanup();
  });
  it("Should have an index method", () => {
    expect(userStore.index).toBeDefined();
  });
  it("Should have an create method", () => {
    expect(userStore.create).toBeDefined();
  });
  it("Should have an show method", () => {
    expect(userStore.show).toBeDefined();
  });
  it("Should have an authenticate method", () => {
    expect(userStore.authenticate).toBeDefined();
  });
  it("index method should return empty list of users", async () => {
    const results = await userStore.index();
    expect(results).toEqual([]);
  });
  it("create method should add user", async () => {
    const user = {
      firstname: "rushabha",
      lastname: "jain",
      email: userEmail,
      password: userPassword
    };
    const addedUser = await userStore.create(user);
    userId = addedUser.id as number;
    expect(addedUser.id).toBeDefined();
  });
  it("Should authenticate user", async () => {
    const authenticated = await userStore.authenticate(userEmail, userPassword);
    expect(authenticated).not.toBeNull();
  });
  it("Should not authenticate user for invalid password", async () => {
    const authenticated = await userStore.authenticate(
      userEmail,
      "Invalid Password"
    );
    expect(authenticated).toBeNull();
  });
  it("Should not authenticate user for invalid email", async () => {
    const authenticated = await userStore.authenticate("xyz", userPassword);
    expect(authenticated).toBeNull();
  });
  it("show method should return the user", async () => {
    const product = await userStore.show(userId);
    expect(product).not.toBeNull();
  });
});
