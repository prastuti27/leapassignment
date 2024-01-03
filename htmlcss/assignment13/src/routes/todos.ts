import { Router, Request, Response } from "express";
import { addTodo, getTodos } from "../controller/todos";
// import { logger } from "../middleware/logger";
import { validateReqQuery } from "../middleware/validator";
import {getUserSchema}  from "../schema/users";
const router = Router();
router.get("/", validateReqQuery(getUserSchema), getTodos);
router.post("/", addTodo);
// router.get("/", logger, getTodos);

export default router;
