import { Router } from "express";
import todos from "./todos";
import auth from "./auth";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.use("/todos", todos);
// router.use("/auth", authMiddleware, auth);
router.use("/auth", auth);

export default router;
