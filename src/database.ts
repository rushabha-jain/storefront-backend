import { Pool } from "pg";
import dotenv from "dotenv";

const env = process.env.NODE_ENV;

if (env === "test") {
  dotenv.config({
    path: "./test.env"
  });
} else {
  dotenv.config({
    path: "./dev.env"
  });
}

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
} = process.env;

const pool = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB
});

export default pool;
