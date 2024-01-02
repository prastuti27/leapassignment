import { Router } from "express";
import todos from "./todos";
import auth from "./auth";

const router = Router();
router.use("/todos", todos);
router.use("/auth", auth);

export default router;
