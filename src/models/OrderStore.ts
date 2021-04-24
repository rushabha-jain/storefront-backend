import Client from "../database";
import { QueryResult } from "pg";

export enum OrderStatusTypes {
  STATUS_ACTIVE,
  STATUS_COMPLETED
}

export type Order = {
  id?: number;
  user_id: number;
  status?: OrderStatusTypes;
};

export class OrderStore {
  async showOrdersByUserId(
    userId: number,
    status?: OrderStatusTypes
  ): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      let ordersTable: QueryResult<Order>;
      if (status || status === 0) {
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
      const connection = await Client.connect();
      const ordersTable = await connection.query(
        "INSERT INTO orders(user_id) VALUES ($1) RETURNING id;",
        [order.user_id]
      );
      connection.release();
      return {
        ...ordersTable.rows[0],
        ...order
      };
    } catch (error) {
      throw new Error(`Unable to mark order complete by user ${error}`);
    }
  }

  async markOrderComplete(orderId: number) {
    try {
      const connection = await Client.connect();
      await connection.query("UPDATE orders SET status=1 WHERE id=$1;", [
        orderId
      ]);
      connection.release();
    } catch (error) {
      throw new Error(`Unable to mark order complete by user ${error}`);
    }
  }

  async delete(id?: number): Promise<void> {
    try {
      const databaseConnection = await Client.connect();
      if (id) {
        await databaseConnection.query("DELETE FROM orders WHERE id=$1", [id]);
      } else {
        await databaseConnection.query("DELETE FROM orders");
      }
      databaseConnection.release();
    } catch (error) {
      throw new Error(`Unable to delete order ${error}`);
    }
  }
}
