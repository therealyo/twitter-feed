import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { Kafka } from "kafkajs";

import FeedService from "./services/FeedService";

import FeedController from "./controllers/FeedController";

import MessageRepository from "./database/repositories/MessageRepository";
import MessagingFactory from "./pubsub/Messages";

import App from "./App";
import load from "./config/config";

const config = load();

const main = async () => {
  try {
    const pool = new Pool({
      connectionString: config.connectionString,
      ssl: false,
    });

    const db = drizzle(pool, { logger: true });

    await migrate(db, { migrationsFolder: "./migrations" });

    const kafka = new Kafka({ clientId: "app", brokers: ["kafka:9092"] });

    const [messagePub, messageSub] = await Promise.all([
      MessagingFactory.createMessagePublisher(kafka, config),
      MessagingFactory.createMessageConsumer(kafka, config),
    ]);

    const messages = new MessageRepository(db, messageSub);

    const feedService = new FeedService(messages, messagePub);

    const feedController = new FeedController(feedService);

    const port = config.port;
    const controllers = [feedController];
    const app = new App(port, controllers);

    app.listen();
    return app;
  } catch (e: unknown) {
    console.log("here");
    if (e instanceof Error) {
      console.error(e.message);
      process.exit(1);
    }
  }
};

main();

export default main;
