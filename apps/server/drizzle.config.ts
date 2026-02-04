// https://orm.drizzle.team/docs/get-started/postgresql-new#step-5---setup-drizzle-config-file
import { defineConfig } from "drizzle-kit";

// biome-ignore lint/style/noDefaultExport: drizzle config
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  // Use process.env for easier migrating in production
  dbCredentials: {
    url: process.env["DATABASE_URL"] as string,
    // // SSL must be `require` since Railway uses self-signed certificates.
    ssl: "require",
  },
});
