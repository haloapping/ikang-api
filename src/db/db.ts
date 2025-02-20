import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "ikang",
  connectionTimeoutMillis:
    Number(process.env.DB_CONNECTION_TIMEOUT_MILLIS) || 2000,
  statement_timeout: 2000,
});
