import { NextFunction, Request, Response } from "express";

const isUser = (req: Request, res: Response, next: NextFunction) => {
  const userRoleId = parseInt(req.token.role);
  if (userRoleId !== 1) {
    return res.json("You must be logged");
  }
  next();
};

export { isUser };
