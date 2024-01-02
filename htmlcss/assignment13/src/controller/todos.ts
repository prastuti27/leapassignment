import { Request, Response } from "express";

export const addTodo = (req: Request, res: Response) => {
  res.json({ message: "add Todo" });
};

export const getTodos = (req: Request, res: Response) => {
  res.json({ message: "get todos" });
};
