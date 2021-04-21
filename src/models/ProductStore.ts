import Client from "../database";

export interface Product {
  id?: number;
  name: string;
  price: number;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const databaseConnection = await Client.connect();
      const productTable = await databaseConnection.query(
        "SELECT * FROM products"
      );
      databaseConnection.release();
      return productTable.rows;
    } catch (error) {
      throw new Error(`Unable to get products ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const databaseConnection = await Client.connect();
      const productTable = await databaseConnection.query(
        "INSERT INTO products(name, price) VALUES($1, $2)",
        [product.name, product.price]
      );
      databaseConnection.release();
      return productTable.rows[0];
    } catch (error) {
      throw new Error(`Unable to create product ${error}`);
    }
  }

  async show(id: number): Promise<Product | null> {
    try {
      const databaseConnection = await Client.connect();
      const productTable = await databaseConnection.query(
        "SELECT * FROM products WHERE id=$1",
        [id]
      );
      databaseConnection.release();
      if (productTable.rowCount > 0) {
        return productTable.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(`Unable to get product ${error}`);
    }
  }
}
