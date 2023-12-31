import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import config from "../config";

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1] as string;

  if (!token) {
    res.status(401).json({ message: "Token not Found" });
  }

  const decode = jwt.verify(token, config.jwt.accessTokenSecret!);

  req.user = decode;

  next();
};
