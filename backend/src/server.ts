import express, { Response, Request } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, async (req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import("./swagger.json")));
});
