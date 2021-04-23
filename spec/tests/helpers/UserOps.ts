import { UserStore, User } from "../../../src/models/UserStore";
import { generateJWTToken } from "../../../src/util/jwtToken";

export type AuthUser = User & {
  token: string;
};

const userStore = new UserStore();

export async function createRandomUser(): Promise<AuthUser> {
  const user = {
    firstname: "random",
    lastname: "random",
    email: "xyz@xyz.com",
    password: "random"
  };
  const newUser = await userStore.create(user);
  return {
    ...newUser,
    token: generateJWTToken({
      email: newUser.email
    })
  };
}
