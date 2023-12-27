import { Request, Response } from "express";
import { User } from "../models/User";

const getAllusers = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
    
        const allActivities = await User.find({
          where: {
            id,
          },
        });
    
        return res.json({
          success: true,
          message: "All users retrieved",
          data: allActivities,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Users can't be retrieved",
          error: error,
        });
      }
};

export { getAllusers };
