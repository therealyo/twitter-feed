import { RequestHandler, Router } from "express";
import { ZodTypeAny } from "zod";
import { badRequest } from "@hapi/boom";

abstract class Controller {
  public readonly path: string;
  public readonly router: Router;

  public constructor(path: string) {
    this.path = path;
    this.router = Router();
  }

  protected abstract readonly initializeRoutes: () => void;

  protected readonly validateRequest =
    (schema: ZodTypeAny): RequestHandler =>
    async (req, res, next) => {
      const parsed = schema.safeParse(req.body);
      if (parsed.success) {
        return next();
      } else {
        return next(
          badRequest(
            parsed.error.issues
              .map(({ path, message }) => `${path.join(".")}: ${message}`)
              .join("; "),
            parsed.error.issues
          )
        );
      }
    };
}

export default Controller;
