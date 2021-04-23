import { UserStore } from "../../../src/models/UserStore";
import { ProductStore } from "../../../src/models/ProductStore";
import { OrderStore } from "../../../src/models/OrderStore";
import { OrderProductStore } from "../../../src/models/OrderProductStore";

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
const orderProductStore = new OrderProductStore();

export default async function() {
  await orderProductStore.delete();
  await orderStore.delete();
  await userStore.delete();
  await productStore.delete();
}
