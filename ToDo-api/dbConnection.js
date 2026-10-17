import {Pool} from "pg";

export const pool = new Pool({
  user: process.env.USER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});
