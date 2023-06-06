import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const main = async () => {
  const pool = new Pool({
    connectionString: "postgres://user:password@host:port/db",
  });

  //   await client.connect();
  const db = drizzle(pool);
};

main();

export default main;
