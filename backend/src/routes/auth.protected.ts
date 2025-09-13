// routes/protected.ts
import express from "express";
import { authMiddleware, AuthenticatedRequest } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/protected", authMiddleware, (req: AuthenticatedRequest, res) => {
  res.json({
    message: "You are authorized!",
    user: req.user, 
  });
});

export default router;
