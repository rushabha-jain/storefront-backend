import {
  OrderProductStore,
  OrderProduct
} from "../../../src/models/OrderProductStore";
import { createRandomProduct } from "../helpers/ProductOps";
import { createRandomOrder } from "../helpers/OrderOps";
import cleanup from "../helpers/cleanup";

const orderProductStore = new OrderProductStore();
let productId: number, orderId: number;

describe("OrderProduct Model", () => {
  // Setup dependent model
  beforeAll(async () => {
    const newProduct = await createRandomProduct();
    productId = newProduct.id as number;
    const newOrder = await createRandomOrder();
    orderId = newOrder.id as number;
  });
  afterAll(async () => {
    await cleanup();
  });
  it("Should add product in the order", async () => {
    const orderProduct: OrderProduct = {
      product_id: productId,
      order_id: orderId,
      quantity: 10
    };
    const newProductOrder = await orderProductStore.create(orderProduct);
    expect(newProductOrder.id).toBeDefined();
  });

  it("Should return the products associated with order", async () => {
    const products = await orderProductStore.getProductsByOrderId(orderId);
    expect(products.length).toBeGreaterThan(0);
  });
});
