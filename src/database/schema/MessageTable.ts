import { InferModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export type Message = InferModel<typeof messagesTable, "select">;
export type NewMessage = InferModel<typeof messagesTable, "insert">;

const messagesTable = pgTable("messages_table", {
  id: serial("id").primaryKey(),
  text: varchar("text").notNull(),
});

export const selectMessageSchema = createSelectSchema(messagesTable);
export const insertMessageSchema = createInsertSchema(messagesTable);

export default messagesTable;
