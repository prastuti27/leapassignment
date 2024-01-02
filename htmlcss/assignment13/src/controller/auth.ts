import { Request, Response } from "express";
import bcrypt from "bcrypt";
import users from "../model/users";
export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedpass = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, email, password: hashedpass });
  res.json({ users });
};
