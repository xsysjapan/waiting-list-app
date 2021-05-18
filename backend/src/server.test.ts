import request from "supertest";
import app from "./server";
import http from "http";

describe("app", () => {
  let server: ReturnType<typeof http.createServer>;
  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
  });
  afterAll(() => {
    server.close();
  });
  test("/api/session should return 200 and empty object if not logged in", () => {
    return request(server).get("/api/session").expect(200).expect({});
  });
});
