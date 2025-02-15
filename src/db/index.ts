import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST || "lolcahost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  max: Number(process.env.MAX_POOL) || 20,
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MILLIS) || 30000,
  connectionTimeoutMillis:
    Number(process.env.DB_CONNECTION_TIMEOUT_MILLIS) || 2000,
});
