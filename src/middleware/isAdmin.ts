import { NextFunction, Request, Response } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRoleId = parseInt(req.token.role);
  if (userRoleId !== 2) {
    return res.json("You need admin privileges to run this operation");
  }
  next();
};

export { isAdmin };
