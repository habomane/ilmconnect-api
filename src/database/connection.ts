import { createClient } from "@libsql/client";
import * as dotenv from 'dotenv';
dotenv.config();

export const tursoDB = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
