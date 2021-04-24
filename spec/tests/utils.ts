import { UserStore, UserPreview } from "../../src/models/UserStore";
import { ProductStore, Product } from "../../src/models/ProductStore";
import { OrderStore, Order } from "../../src/models/OrderStore";
import { OrderProductStore } from "../../src/models/OrderProductStore";
import { generateJWTToken } from "../../src/util/jwtToken";

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
const orderProductStore = new OrderProductStore();

export type AuthUser = UserPreview & {
  token: string;
};

export async function cleanup() {
  await orderProductStore.delete();
  await orderStore.delete();
  await userStore.delete();
  await productStore.delete();
}

export async function createRandomOrder(): Promise<
  Order & {
    user: AuthUser;
  }
> {
  const randomUser = await createRandomUser();
  const order: Order = {
    user_id: randomUser.id as number
  };
  const newOrder = await orderStore.create(order);
  return {
    ...newOrder,
    user: randomUser
  };
}

export async function createRandomProduct(): Promise<Product> {
  const product = {
    name: "iPhone SE",
    price: 399
  };
  const newProduct = await productStore.create(product);
  return newProduct;
}

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
