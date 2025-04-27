export default {
  schema: "./src/lib/db/schema.js",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL },
};
