import { Router } from "express";
import { login } from "./auth.service";

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.get("/api/session", async (req, res) => {
  res.status(200).send({
    succeeded: true,
    user: {
      username: "admin",
      name: "管理者",
    },
  });
});

router.post("/api/session", async (req, res) => {
  const result = await login(req.body.username, req.body.password);
  if (result) {
    res.status(200).send({
      succeeded: true,
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
