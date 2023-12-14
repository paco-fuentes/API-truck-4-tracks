import { NextFunction, Request, Response } from "express";

const isUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.token.role !== "user") {
    return res.json("You mus be logged");
  }
  next();
};

export { isUser };
