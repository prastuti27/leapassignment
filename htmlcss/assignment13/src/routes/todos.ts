import { Router, Request, Response } from "express";
import { addTodo, getTodos } from "../controller/todos";
import { logger } from "../middleware/logger";
const router = Router();
router.post("/", addTodo);
router.get("/", logger, getTodos);

export default router;
