import { RequestHandler } from "express";
import Controller from "./Controller";
import FeedService from "@/services/FeedService";

class FeedController extends Controller {
  constructor(private readonly feedService: FeedService) {
    super("/feed");
  }

  protected readonly initializeRoutes = () => {
    this.router.get("/", this.getFeed);

    this.router.post("/", this.createMessage);
  };

  private readonly createMessage: RequestHandler<any, any, any, any> = async (
    req,
    res
  ) => {
    try {
    } catch (e: unknown) {}
  };

  private readonly getFeed: RequestHandler<any, any, any, any> = async (
    req,
    res
  ) => {
    try {
    } catch (e: unknown) {}
  };
}

export default FeedController;
