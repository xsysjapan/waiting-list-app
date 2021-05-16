import { Request, Response } from "express";
import { createConnection } from "typeorm";
import "reflect-metadata";

import app from "./server";
import config from "../config.json";
import { User } from "./entity/User";
import { Routes } from "./routes";

createConnection()
  .then(async (connection) => {
    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // Start the application by listening to specific port
    const port = Number(process.env.PORT || config.PORT || 8080);
    app.listen(port, () => {
      console.info("Express application started on port: " + port);
    });

    // insert new users for test
    const adminUsers = await connection.manager.find(User, {
      where: "username == 'admin'",
    });
    if (adminUsers.length == 0) {
      await connection.manager.save(
        connection.manager.create(User, {
          username: "admin",
          name: "管理者",
        })
      );
    }
  })
  .catch(console.log);
