import { OrderStore, Order } from "../../../src/models/OrderStore";
import { createRandomUser, AuthUser } from "./UserOps";

const orderStore = new OrderStore();
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
