import { UserStore, User } from "../../../src/models/UserStore";

const userStore = new UserStore();

export async function createRandomUser(): Promise<User> {
  const user = {
    firstname: "random",
    lastname: "random",
    email: "xyz@xyz.com",
    password: "random"
  };
  const newUser = await userStore.create(user);
  return newUser;
}

export async function deleteRandomUser(userId: number) {
  await userStore.delete(userId);
}
