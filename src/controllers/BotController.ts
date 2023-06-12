import autocannon from "autocannon";
import { RequestHandler, Response } from "express";

import Controller from "./Controller";
import { Boom, internal } from "@hapi/boom";
import { Config } from "@/config/config";

class BotController extends Controller {
  constructor(config: Config) {
    super("/bot", config);

    this.initializeRoutes();
  }

  protected readonly initializeRoutes = () => {
    this.router.post("/start", this.startBench);
  };

  private readonly startBench: RequestHandler<
    {},
    string,
    {},
    { requests?: number; duration?: number; rate?: number }
  > = async (req, res, next) => {
    try {
      const { requests: amount, duration, rate: connectionRate } = req.query;

      await autocannon({
        url: `http://localhost:${this.config.port}/feed`,
        amount,
        duration,
        connectionRate,
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: "botMessage" }),
      });

      return res.sendStatus(200);
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

export default BotController;
