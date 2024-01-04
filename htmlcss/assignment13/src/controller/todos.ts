import { NextFunction, Request, Response } from "express";
import * as todoService from "../services/todos";

// export const addTodo = (req: Request, res: Response) => {
//   res.json({ message: "add Todo" });
// };
export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const data = await todoService.add(body);

    return res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const getTodos = (req: Request, res: Response) => {
  res.json({ message: "get todos" });
};
