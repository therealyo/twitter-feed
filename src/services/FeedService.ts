import MessageRepository from "@/database/repositories/MessageRepository";
import { NewMessage } from "@/database/schema/MessageTable";
import { MessagePublisher } from "@/pubsub/Messages";

class FeedService {
  constructor(
    private readonly messages: MessageRepository,
    private readonly messagePub: MessagePublisher
  ) {}

  public readonly createMessage = async (message: NewMessage) => {
    return await this.messagePub.publish(message);
  };

  public readonly getAll = async () => {
    return this.messages.getAll();
  };

  public readonly getMessagesSince = async (timestamp: Date) => {
    return this.messages.getMessagesSince(timestamp);
  };
}

export default FeedService;
