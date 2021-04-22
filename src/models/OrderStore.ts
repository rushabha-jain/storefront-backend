import Client from "../database";
import { QueryResult } from "pg";

export type OrderStatus = 0 | 1;

export type Order = {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
  status?: OrderStatus;
};

export class OrderStore {
  async showOrdersByUserId(
    userId: number,
    status?: OrderStatus
  ): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      let ordersTable: QueryResult<any>;
      if (status) {
        ordersTable = await connection.query(
          "SELECT * FROM orders WHERE user_id=$1 AND status=$2;",
          [userId, status]
        );
      } else {
        ordersTable = await connection.query(
          "SELECT * FROM orders WHERE user_id=$1;",
          [userId]
        );
      }
      connection.release();
      return ordersTable.rows;
    } catch (error) {
      throw new Error(`Unable to get list of orders by user ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      if (order.quantity > 0) {
        const connection = await Client.connect();
        const ordersTable = await connection.query(
          "INSERT INTO orders(user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING id;",
          [order.user_id, order.product_id, order.quantity]
        );
        connection.release();
        return {
            ...ordersTable.rows[0],
            ...order
        };
      }
      throw new Error("Enter valid quantity");
    } catch (error) {
      throw new Error(`Unable to mark order complete by user ${error}`);
    }
  }

  async markOrderComplete(orderId: number) {
    try {
      const connection = await Client.connect();
      const ordersTable = await connection.query(
        "UPDATE orders SET status=1 WHERE id=$1;",
        [orderId]
      );
      connection.release();
      return ordersTable.rows;
    } catch (error) {
      throw new Error(`Unable to mark order complete by user ${error}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const databaseConnection = await Client.connect();
      await databaseConnection.query("DELETE FROM orders WHERE id=$1", [id]);
      databaseConnection.release();
    } catch (error) {
      throw new Error(`Unable to delete order ${error}`);
    }
  }
}
