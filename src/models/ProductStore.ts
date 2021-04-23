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
      const productsTable = await databaseConnection.query(
        "INSERT INTO products(name, price) VALUES($1, $2) RETURNING id",
        [product.name, product.price]
      );
      databaseConnection.release();
      return {
        ...productsTable.rows[0],
        ...product
      };
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

  async delete(id?: number): Promise<void> {
    try {
      const databaseConnection = await Client.connect();
      if (id) {
        await databaseConnection.query("DELETE FROM products WHERE id=$1", [
          id
        ]);
      } else {
        await databaseConnection.query("DELETE FROM products");
      }
      databaseConnection.release();
    } catch (error) {
      throw new Error(`Unable to delete product ${error}`);
    }
  }
}
