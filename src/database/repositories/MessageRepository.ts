import { NodePgDatabase } from "drizzle-orm/node-postgres";

class MessageRepository {
  constructor(private readonly db: NodePgDatabase) {}
}

export default MessageRepository;
