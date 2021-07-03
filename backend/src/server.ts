import path from "path";
import express, { Response, Request, NextFunction } from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import { ValidateError } from "tsoa";
import { InvalidOperationError, NotFoundError } from "./errors";

export const app = express();
if (process.env.NODE_ENV == "Production") {
  app.use(helmet());
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
RegisterRoutes(app);
app.use(
  "/api",
  (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        code: "InvalidEntity",
        message: "Validation Failed",
        details: err?.fields,
      });
    }
    if (err instanceof NotFoundError) {
      console.warn(`Not Found Error for ${req.path}`);
      return res.status(404).json({
        code: "NotFound",
        message: "Not Found",
      });
    }
    if (err instanceof InvalidOperationError) {
      console.warn(
        `Invalid Operation Error for ${req.path}, code: ${err.code}, message: ${err.message}`
      );
      return res.status(400).json({
        code: err.code,
        message: err.message,
      });
    }
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({
        code: "UnknownError",
        message: "Internal Server Error",
      });
    }

    next();
  }
);

app.use("/docs", swaggerUi.serve, async (req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import("./swagger.json")));
});

// Routes for SPA
app.use(express.static(__dirname + "/public"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
