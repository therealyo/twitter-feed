import express, { Application } from "express";
import cors from "cors";

import Controller from "./controllers/Controller";

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
    this.controllers.forEach((controller: Controller) => {
      this.express.use(`${controller.path}`, controller.router);
    });
  };

  private readonly initializeErrorHandling = () => {};

  public readonly listen = () => {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  };
}

export default App;
