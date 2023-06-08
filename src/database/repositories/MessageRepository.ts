import { NodePgDatabase } from "drizzle-orm/node-postgres";
import messagesTable, { NewMessage } from "../schema/MessageTable";

class MessageRepository {
  constructor(private readonly db: NodePgDatabase) {}

  public readonly createMessage = async (message: NewMessage) => {
    return this.db.insert(messagesTable).values(message).returning();
  };
}

export default MessageRepository;
