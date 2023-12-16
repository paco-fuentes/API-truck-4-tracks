import { Response, Request } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";

const register = async (req: Request, res: Response) => {
  try {
    const activity_id = req.body.activity_id;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const img_url = req.body.img_url;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      activity_id: activity_id,
      username: username,
      email: email,
      password: encryptedPassword,
      img_url: img_url,
    }).save();
    console.log(newUser);

    return res.json({
      success: true,
      message: "New user created succesfully",
      token: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User can't be created",
      error: error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOneBy({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User incorrect",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        success: true,
        message: "Password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role_id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "3h",
      }
    );

    return res.json({
      success: true,
      message: "User logged succesfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "users cant be logged",
      error: error,
    });
  }
};

const profile = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { id: req.token.id },
      relations: ["activity"],
    });

    return res.json({
      success: true,
      message: "profile user retrieved",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user can't get profile",
      error: error,
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const role_id = req.body.role_id;
    const activity_id = req.body.activity_id;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const img_url = req.body.img_url;
    const is_active = req.body.is_active;

    const user = await User.findOneBy({ id: req.token.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (role_id) {
      user.role_id = role_id;
    }
    if (activity_id) {
      user.activity_id = activity_id;
    }
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const encryptedPassword = bcrypt.hashSync(password, 10);
      user.password = encryptedPassword;
    }
    if (img_url) {
      user.img_url = img_url;
    }
    if (is_active) {
      user.is_active = is_active;
    }

    const updatedUser = await user.save();

    return res.json({
      success: true,
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User profile update failed",
      error: error,
    });
  }
};

export { register, login, profile, updateProfile };
