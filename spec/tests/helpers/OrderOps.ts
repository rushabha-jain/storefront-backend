import { OrderStore, Order } from "../../../src/models/OrderStore";
import { createRandomUser } from "./UserOps";

const orderStore = new OrderStore();
export async function createRandomOrder(): Promise<Order> {
  const randomUser = await createRandomUser();
  const order: Order = {
    user_id: randomUser.id as number
  };
  const newOrder = await orderStore.create(order);
  return newOrder;
}