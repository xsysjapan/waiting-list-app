import { Router } from "express";
import { User } from "../../entity/User";
import { login } from "./auth.service";

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.get("/api/session", async (req, res) => {
  req.session.reload(() => {
    const session = req.session as any;
    const user = session.user as User | undefined;
    if (user) {
      res.status(200).send({
        succeeded: true,
        user: {
          username: user.username,
          name: user.name,
        },
      });
    } else {
      res.status(200).send({
        succeeded: false,
      });
    }
  });
});

router.post("/api/session", async (req, res) => {
  const result = await login(req.body.username, req.body.password);
  if (result.succeeded) {
    req.session.regenerate(() => {
      const session = req.session as any;
      session.user = result.user;
      session.save();
      res.status(200).send({
        succeeded: true,
      });
    });
  } else {
    res.status(400).send({
      succeeded: false,
      message: "ユーザー名またはパスワードが違います。",
    });
  }
});

router.delete("/api/session", (req, res) => {
  res.status(200).send({
    message: "DELETE request from sample router",
  });
});
