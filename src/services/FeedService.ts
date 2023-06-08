import MessageRepository from "@/database/repositories/MessageRepository";
import { NewMessage } from "@/database/schema/MessageTable";

class FeedService {
  constructor(private readonly messages: MessageRepository) {}

  public readonly createMessage = async (message: NewMessage) => {
    return this.messages.createMessage(message);
  };
}

export default FeedService;
