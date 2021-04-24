import Client from "../database";
import bcrypt from "bcrypt";

export interface User {
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const databaseConnection = await Client.connect();
      const usersTable = await databaseConnection.query(
        "SELECT id, firstname, lastname, email FROM users"
      );
      databaseConnection.release();
      return usersTable.rows;
    } catch (error) {
      throw new Error(`Unable to get list of users ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const databaseConnection = await Client.connect();
      const pepper = process.env.BCRYPT_PASSWORD;
      const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
      const hashedPassword = await bcrypt.hash(
        user.password + pepper,
        saltRounds
      );
      const usersTable = await databaseConnection.query(
        "INSERT INTO users(email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [user.email, user.firstname, user.lastname, hashedPassword]
      );
      databaseConnection.release();
      return {
        ...usersTable.rows[0],
        ...user,
        password: undefined
      };
    } catch (error) {
      throw new Error(`Unable to create user ${error}`);
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await Client.connect();
      const pepper = process.env.BCRYPT_PASSWORD;
      const usersTable = await connection.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
      );
      const passwordToCompare = password + pepper;
      if (usersTable.rowCount > 0) {
        const user = usersTable.rows[0] as User;
        const isPasswordSame = await bcrypt.compare(
          passwordToCompare,
          user.password
        );
        if (isPasswordSame) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new Error(`Unable to authenticate user ${error}`);
    }
  }

  async show(id: number): Promise<User | null> {
    const connection = await Client.connect();
    const usersTable = await connection.query(
      "SELECT id, firstname, lastname, email FROM users WHERE id=$1",
      [id]
    );
    if (usersTable.rowCount > 0) {
      return usersTable.rows[0];
    }
    return null;
  }

  async delete(id?: number): Promise<void> {
    try {
      const databaseConnection = await Client.connect();
      if (id) {
        await databaseConnection.query("DELETE FROM users WHERE id=$1", [id]);
      } else {
        await databaseConnection.query("DELETE FROM users");
      }
      databaseConnection.release();
    } catch (error) {
      throw new Error(`Unable to delete user ${error}`);
    }
  }
}
