import { RequestHandler } from "express";

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

        const [inserted] = await this.feedService.createMessage(message);

        return res.status(201).json(inserted);
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
      const messages = await this.feedService.getAll();
      console.log("MESSAGES: ", messages);

      return res.status(200).json(messages);
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
