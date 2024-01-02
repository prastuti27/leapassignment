import { Request, Response } from "express";
import { signup, login } from "../services/auth";

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await signup(email, password);
  res.json({ user });
};
export const logIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await login(email, password);
  res.json({ user });
};
