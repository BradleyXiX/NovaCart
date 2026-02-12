import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, DATABASE_URL } = process.env;

// use DATABASE_URL when provided, otherwise fall back to individual PG_* vars
const connectionString = DATABASE_URL || `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;

export const sql = neon(connectionString);
// this sql function we export is used as a tagged template literal, which allows us to write SQL queries safely

