import Client from "../database";
import { Product } from "./ProductStore";

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export type OrderDetail = OrderProduct & Product;

export class OrderProductStore {
  async getProductsByOrderId(orderId: number): Promise<OrderDetail[]> {
    try {
      const connection = await Client.connect();
      const orderProductTable = await connection.query(
        "SELECT name, price, quantity FROM order_product INNER JOIN products ON products.id=order_product.product_id WHERE order_id=$1;",
        [orderId]
      );
      connection.release();
      return orderProductTable.rows;
    } catch (error) {
      throw new Error("Unable to get products by its ID");
    }
  }

  async create(orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const connection = await Client.connect();
      const orderProductTable = await connection.query(
        "INSERT INTO order_product(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING id;",
        [orderProduct.order_id, orderProduct.product_id, orderProduct.quantity]
      );
      connection.release();
      return {
        ...orderProductTable.rows[0],
        ...orderProduct
      };
    } catch (error) {
      throw new Error(`Unable to add order_product ${error}`);
    }
  }
}
