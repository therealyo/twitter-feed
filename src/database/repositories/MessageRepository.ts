import { NodePgDatabase } from "drizzle-orm/node-postgres";

import messagesTable, { NewMessage } from "../schema/MessageTable";
import { MessageConsumer } from "@/pubsub/Messages";
import { gte } from "drizzle-orm";

class MessageRepository {
  constructor(
    private readonly db: NodePgDatabase,
    private readonly messageSub: MessageConsumer
  ) {
    this.messageSub.onMessage(this.createMessage);
  }

  public readonly createMessage = async (message: NewMessage) => {
    return await this.db.insert(messagesTable).values(message).execute();
  };

  public readonly getAll = async () => {
    return this.db.select().from(messagesTable).execute();
  };

  public readonly getMessagesSince = async (timestamp: Date) => {
    return this.db
      .select()
      .from(messagesTable)
      .where(gte(messagesTable.created, timestamp))
      .execute();
  };
}

export default MessageRepository;
