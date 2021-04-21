import Client from "../database";

export interface Product {
  id: string;
  name: string;
  price: number;
}

export class ProductStore {
  static async index(): Promise<Product[]> {
    try {
      const databaseConnection = await Client.connect();
      const productTable = await databaseConnection.query("SELECT * FROM products");
      databaseConnection.release();
      return productTable.rows;
    } catch (error) {
      throw new Error(`Unable to get products ${error}`);
    }
  }
}
