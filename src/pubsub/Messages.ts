import { Config } from "@/config/config";
import { Kafka, Producer, Consumer } from "kafkajs";

export class MessagePublisher {
  private readonly producer: Producer;

  constructor(private readonly config: Config, kafka: Kafka) {
    this.producer = kafka.producer();
  }

  public connect = async () => {
    await this.producer.connect().catch((e) => console.log(e));
    return this;
  };

  public publish = async (message: any) => {
    return this.producer.send({
      topic: this.config.feedTopic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  };

  public disconnect = async () => {
    return this.producer
      .disconnect()
      .catch((e) => console.log(`Error on disconnect ${e}`));
  };
}

export class MessageConsumer {
  private readonly consumer: Consumer;

  constructor(private readonly config: Config, kafka: Kafka) {
    this.consumer = kafka.consumer({ groupId: this.config.feedGroupId });
  }

  public connect = async () => {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: this.config.feedTopic,
      fromBeginning: true,
    });

    return this;
  };

  public onMessage = async (handler: (...args: any) => any) => {
    return this.consumer
      .run({
        eachMessage: async ({ topic, partition, message }) => {
          if (message.value) {
            const data = JSON.parse(message.value.toString());
            handler(data);
          }
        },
      })
      .catch((e) => console.log(e));
  };

  public disconnect = async () => {
    return this.consumer
      .disconnect()
      .catch((e) => console.log(`Error on disconnect ${e}`));
  };
}

class MessagingFactory {
  public static createMessagePublisher = async (
    kafka: Kafka,
    config: Config
  ) => {
    const pub = new MessagePublisher(config, kafka);
    return pub.connect();
  };

  public static createMessageConsumer = async (
    kafka: Kafka,
    config: Config
  ) => {
    const sub = new MessageConsumer(config, kafka);
    return sub.connect();
  };
}

export default MessagingFactory;
