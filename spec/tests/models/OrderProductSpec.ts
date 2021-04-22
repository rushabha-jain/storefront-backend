import {
  OrderProductStore,
  OrderProduct
} from "../../../src/models/OrderProductStore";
import {
  createRandomProduct,
  deleteRandomProduct
} from "../helpers/ProductOps";
import { createRandomOrder, deleteRandomOrder } from "../helpers/OrderOps";

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
    await deleteRandomOrder(orderId);
    await deleteRandomProduct(productId);
  });

  it("Should add product in the order", async () => {
    const orderProduct: OrderProduct = {
      product_id: productId,
      order_id: orderId,
      quantity: 10
    };
    const newProductOrder = await orderProductStore.create(orderProduct);
    orderId = newProductOrder.id as number;
    expect(newProductOrder.id).toBeDefined();
  });

  it("Should return the products associated with order", async () => {
    const products = await orderProductStore.getProductsByOrderId(orderId);
    expect(products.length).toBeGreaterThan(0);
  });
});