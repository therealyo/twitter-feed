import { RequestHandler, Response } from "express";

import Controller from "./Controller";

import FeedService from "@/services/FeedService";
import {
  Message,
  NewMessage,
  insertMessageSchema,
} from "@/database/schema/MessageTable";
import { Boom, internal } from "@hapi/boom";

class FeedController extends Controller {
  constructor(private readonly feedService: FeedService) {
    super("/feed");

    this.initializeRoutes();
  }

  protected readonly initializeRoutes = () => {
    this.router.get("/", this.getFeed);

    this.router.post(
      "/",
      this.validateRequest(insertMessageSchema),
      this.createMessage
    );
  };

  private readonly createMessage: RequestHandler<{}, Message, NewMessage, {}> =
    async (req, res, next) => {
      try {
        const message = req.body;

        await this.feedService.createMessage(message);

        return res.sendStatus(201);
      } catch (e: unknown) {
        console.error(e);
        if (e instanceof Boom) {
          return next(e);
        } else if (e instanceof Error) {
          return next(internal("Something went wrong"));
        }
      }
    };

  private readonly getFeed: RequestHandler<any, any, any, any> = async (
    req,
    res,
    next
  ) => {
    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("Transfer-Encoding", "chunked");

      const messages = await this.feedService.getAll();

      messages.forEach((message) => {
        const json = JSON.stringify(message);
        res.write(json + "\n");
      });

      let lastCheck = new Date();
      const sendUpdates = async () => {
        const now = new Date();
        const result = await this.feedService.getMessagesSince(lastCheck);

        if (result.length > 0) {
          result.forEach((message) => {
            const json = JSON.stringify(message);
            res.write(json + "\n");
          });
        }

        lastCheck = now;
      };

      const update = setInterval(sendUpdates, 1000);

      res.on("close", () => {
        clearInterval(update);
        res.end();
        console.log("Client closed connection");
      });

      // return res.status(200).json(messages);
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Boom) {
        return next(e);
      } else if (e instanceof Error) {
        return next(internal("Something went wrong"));
      }
    }
  };
}

export default FeedController;
