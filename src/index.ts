import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { config } from "dotenv";

import FeedService from "./services/FeedService";

import FeedController from "./controllers/FeedController";

import MessageRepository from "./database/repositories/MessageRepository";
import App from "./App";

config();

const main = async () => {
  try {
    console.log(process.env);
    const connectionString = `postgres://${process.env.COCKROACH_USER}:${process.env.COCKROACH_PASSWORD}@${process.env.COCKROACH_HOST}:${process.env.COCKROACH_PORT}/${process.env.COCKROACH_DATABASE}`;
    const pool = new Pool({
      connectionString,
      ssl: false,
    });

    const db = drizzle(pool, { logger: true });

    await migrate(db, { migrationsFolder: "./migrations" });
    const messages = new MessageRepository(db);

    const feedService = new FeedService(messages);

    const feedController = new FeedController(feedService);

    const port = process.env.PORT || 5000;
    const controllers = [feedController];
    const app = new App(port, controllers);

    app.listen();
    return app;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
      process.exit(1);
    }
  }
};

main();

export default main;
