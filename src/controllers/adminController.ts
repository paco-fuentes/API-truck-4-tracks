import { Request, Response } from "express";
import { User } from "../models/User";

const getAllusers = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const allUsers = await User.find({
      where: {
        id,
      },
    });

    return res.json({
      success: true,
      message: "All users retrieved",
      data: allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Users can't be retrieved",
      error: error,
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const userToRemove = await User.findOneBy({
      id,
    });

    if (!userToRemove) {
      return res.status(404).json({
        success: false,
        message:
          "User to remove not found or you don't have permission to delete it",
      });
    }

    await userToRemove.remove();

    return res.json({
      success: true,
      message: "User deleted succesfully",
      data: userToRemove,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User can't be deleted",
      error: error,
    });
  }
};

export { getAllusers, deleteUserById };
