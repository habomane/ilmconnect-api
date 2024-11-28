import { createClient } from "@libsql/client";
import { config } from "dotenv";

config();

console.log(process.env.TURSO_AUTH_TOKEN)
export const tursoDB = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
