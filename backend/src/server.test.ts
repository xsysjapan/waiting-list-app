import request from "supertest";
import app from "./server";
import http, { Server } from "http";
import { Connection, createConnection } from "typeorm";
import { User } from "./entity/User";
import bcrypt from "bcryptjs";
import cookie from "cookie";

describe("app", () => {
  let server: Server;
  let connection: Connection;
  beforeAll(async (done) => {
    connection = await createConnection({
      type: "sqljs",
      synchronize: true,
      logging: false,
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migration/**/*.ts"],
      subscribers: ["src/subscriber/**/*.ts"],
      cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber",
      },
    });
    await connection.manager.save(
      connection.manager.create(User, {
        username: "admin",
        name: "管理者",
        password: await bcrypt.hash("P@ssw0rd", 10),
      })
    );
    server = http.createServer(app);
    server.listen(done);
  });
  afterAll(async () => {
    server.close();
    await connection.dropDatabase();
    await connection.close();
  });
  test("GET /api/session should return 200 and succeeded false if not logged in", async () => {
    await request(server)
      .get("/api/session")
      .expect(200)
      .expect({ succeeded: false });
  });
  test("GET /api/session should return 200 and user info if logged in", async () => {
    let cookies: any;
    await request(server)
      .post("/api/session")
      .send({ username: "admin", password: "P@ssw0rd" })
      .expect(200)
      .expect({ succeeded: true })
      .expect((res) => {
        cookies = res.headers["set-cookie"];
      });
    await request(server)
      .get("/api/session")
      .set("Cookie", cookies)
      .expect(200)
      .expect((res) => {
        expect(res.body.user).not.toBeUndefined();
      });
  });
  test("GET /api/session should return 200 and succeeded false if sined out", async () => {
    let cookies: any;
    await request(server)
      .post("/api/session")
      .send({ username: "admin", password: "P@ssw0rd" })
      .expect(200)
      .expect({ succeeded: true })
      .expect((res) => {
        cookies = res.headers["set-cookie"];
      });
    await request(server)
      .delete("/api/session")
      .set("Cookie", cookies)
      .expect(200)
      .expect({ succeeded: true });
    await request(server)
      .get("/api/session")
      .set("Cookie", cookies)
      .expect(200)
      .expect({ succeeded: false });
  });
});
