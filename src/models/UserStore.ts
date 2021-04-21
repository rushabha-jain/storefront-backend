import Client from "../database";

export interface User {
  id: string;
  firstname: string;
  lastname: number;
  password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const databaseConnection = await Client.connect();
      const usersTable = await databaseConnection.query("SELECT * FROM users");
      databaseConnection.release();
      return usersTable.rows;
    } catch (error) {
      throw new Error(`Unable to get list users ${error}`);
    }
  }

  async create(user: User) {
    try {
      const databaseConnection = await Client.connect();
      const usersTable = await databaseConnection.query(
        'INSERT INTO users("firstname","lastname", "password") VALUES ($1, $2, $3)',
        [user.firstname, user.lastname, user.password]
      );
      databaseConnection.release();
      return usersTable.rows;
    } catch (error) {
      throw new Error(`Unable to create user ${error}`);
    }
  }
}
