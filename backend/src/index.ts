import bcrypt from "bcryptjs";
import { createConnection } from "typeorm";
import "reflect-metadata";

import app from "./server";
import config from "../config.json";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    // Start the application by listening to specific port
    const port = Number(process.env.PORT || config.PORT || 8080);
    app.listen(port, () => {
      console.info("Express application started on port: " + port);
    });

    // insert new users for test
    const adminUsers = await connection.manager.find(User, {
      username: "admin",
    });
    if (adminUsers.length == 0) {
      await connection.manager.save(
        connection.manager.create(User, {
          username: "admin",
          name: "管理者",
          password: await bcrypt.hash("P@ssw0rd", 10),
        })
      );
    }
  })
  .catch(console.log);
