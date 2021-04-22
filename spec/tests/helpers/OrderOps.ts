import { OrderStore, Order } from "../../../src/models/OrderStore";
import { createRandomUser, deleteRandomUser } from "./UserOps";

const orderStore = new OrderStore();
let userId: number;
export async function createRandomOrder(): Promise<Order> {
  const randomUser = await createRandomUser();
  userId = randomUser.id as number;
  const order: Order = {
    user_id: randomUser.id as number
  };
  const newOrder = await orderStore.create(order);
  return newOrder;
}

export async function deleteRandomOrder(orderId: number) {
  await orderStore.delete(orderId);
  await deleteRandomUser(userId);
}
