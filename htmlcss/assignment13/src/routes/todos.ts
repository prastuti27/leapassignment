import { Router, Request, Response } from "express";
import { addTodo, getTodos } from "../controller/todos";
// import { logger } from "../middleware/logger";
import { validateReqQuery } from "../middleware/validator";
import { getTaskSchema } from "../schema/todo";
const router = Router();
router.get("/", validateReqQuery(getTaskSchema), getTodos);
router.post("/", addTodo);
// router.get("/", logger, getTodos);

export default router;
