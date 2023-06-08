import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export type Message = InferModel<typeof messagesTable, "select">;
export type NewMessage = InferModel<typeof messagesTable, "insert">;

const messagesTable = pgTable("messages_table", {
  id: serial("id").primaryKey(),
  text: varchar("text").notNull(),
});

export default messagesTable;
