import { NextFunction, Request, Response } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.token.role !== "admin") {
    return res.json("You need admin privileges to run this operation");
  }

  next();
};

export { isAdmin };
