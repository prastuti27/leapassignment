import { Router, Request, Response } from "express";
import { addTodo, getTodos } from "../controller/todos";
const router = Router();
router.post("/", addTodo);
router.get("/", getTodos);
export default router;
