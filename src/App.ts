import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

import Controller from "./controllers/Controller";
import { isBoom } from "@hapi/boom";

class App {
  private readonly express: Application;
  constructor(
    private readonly port: number,
    private readonly controllers: Controller[]
  ) {
    this.express = express();

    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorHandling();
  }

  private readonly initializeMiddlewares = () => {
    this.express.use(express.json());
    this.express.use(
      cors({
        origin: "*",
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    );
  };

  private readonly initializeControllers = () => {
    this.express.get("/health", (req: Request, res: Response) =>
      res.status(200).send("ok")
    );
    this.controllers.forEach((controller: Controller) => {
      this.express.use(`${controller.path}`, controller.router);
    });
  };

  private readonly initializeErrorHandling = () => {
    this.express.use(
      (e: Error, _: Request, res: Response, _2: NextFunction) => {
        if (e) {
          const status = isBoom(e) ? e.output.statusCode : 500;
          const message = isBoom(e)
            ? e.message
            : e?.message || "Something went wrong";
          res.status(status).send(message);
        }
      }
    );
  };

  public readonly listen = () => {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  };
}

export default App;
