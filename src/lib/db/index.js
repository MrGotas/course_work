import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";

if (process.env.DATABASE_URL === undefined) {
  throw new Error("DATABASE_URL is not defined");
}

export const db = drizzle(process.env.DATABASE_URL, {
  schema,
});
