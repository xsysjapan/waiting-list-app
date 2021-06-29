import path from "path";
import express, { Response, Request, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import { ValidateError } from "tsoa";
import { NotFoundError, UniqueConstraintError } from "./errors";

export const app = express();

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
    if (err instanceof UniqueConstraintError) {
      console.warn(`Unique Constraint Error for ${req.path}`);
      return res.status(400).json({
        code: "UniqueConstraintError",
        message: "Unique Constraint Error",
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
