import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  NODE_ENV,
  TEST_ENV
} = process.env;

let database_to_connect = POSTGRES_DB;

if (NODE_ENV === TEST_ENV) {
  database_to_connect = POSTGRES_TEST_DB;
}

const pool = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: database_to_connect
});

export default pool;
