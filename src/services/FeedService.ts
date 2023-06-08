import MessageRepository from "@/database/repositories/MessageRepository";

class FeedService {
  constructor(private readonly messages: MessageRepository) {}
}

export default FeedService;
