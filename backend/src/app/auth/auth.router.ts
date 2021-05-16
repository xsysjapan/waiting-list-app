import { Router } from "express";

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.get("/api/session", (req, res) => {
  res.status(200).send({
    succeeded: true,
    user: {
      username: "admin",
      name: "管理者",
    },
  });
});

router.post("/api/session", (req, res) => {
  res.status(200).send({
    succeeded: true,
  });
});

router.delete("/api/session", (req, res) => {
  res.status(200).send({
    message: "DELETE request from sample router",
  });
});
