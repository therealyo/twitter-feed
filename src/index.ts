import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import FeedService from "./services/FeedService";

import FeedController from "./controllers/FeedController";

import MessageRepository from "./database/repositories/MessageRepository";
import App from "./App";

const main = async () => {
  try {
    const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
    const pool = new Pool({
      connectionString,
    });

    const db = drizzle(pool);

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
