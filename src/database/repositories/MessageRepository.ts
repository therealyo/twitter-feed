import { NodePgDatabase } from "drizzle-orm/node-postgres";
import messagesTable, { NewMessage } from "../schema/MessageTable";

class MessageRepository {
  constructor(private readonly db: NodePgDatabase) {}

  public readonly createMessage = async (message: NewMessage) => {
    return this.db.insert(messagesTable).values(message).returning();
  };

  public readonly getAll = async () => {
    return this.db.select().from(messagesTable).execute();
  };
}

export default MessageRepository;
