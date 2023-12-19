import { Response, Request } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { BandMember } from "../models/BandMember";
import { Band } from "../models/Band";
import { QueryFailedError } from "typeorm";

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

const joinBand = async (req: Request, res: Response) => {
  try {
    const user_id = req.token.id;
    const band_id = req.body.band_id;

    const existingMembership = await BandMember.findOne({
      where: { user_id, band_id },
    });

    if (existingMembership) {
      return res.status(400).json({
        success: false,
        message: "User is already a member of the band",
      });
    }

    const newMembership = await BandMember.create({
      user_id,
      band_id,
      is_active: true,
    }).save();

    return res.json({
      success: true,
      message: "User joined the band successfully",
      bandMember: newMembership,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to join the band",
      error: error,
    });
  }
};

const leaveBand = async (req: Request, res: Response) => {
  try {
    const user_id = req.token.id;
    const band_id = req.body.band_id;

    const bandMembership = await BandMember.findOne({
      where: { user_id, band_id },
    });

    if (!bandMembership) {
      return res.status(404).json({
        success: false,
        message: "User is not a member of the band",
      });
    }

    await bandMembership.remove();

    return res.json({
      success: true,
      message: "User left the band successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to leave the band",
      error: error,
    });
  }
};

const getBandMembers = async (req: Request, res: Response) => {
  try {
    console.log(req.token);
    const bandLeaderId = req.token?.id;
    console.log(bandLeaderId);

    if (bandLeaderId === undefined) {
      return res.status(403).json({
        success: false,
        message: "Invalid band leader. Access denied.",
      });
    }

    const bandId = parseInt(req.params.band_id, 10);

    const isBandLeader = await Band.findOneBy({
      id: bandId,
      band_leader: bandLeaderId,
    });

    if (!isBandLeader) {
      return res.status(403).json({
        success: false,
        message: "You are not the band leader. Access denied.",
      });
    }

    const bandMembers = await BandMember.find({
      where: { band: { id: bandId } },
      relations: ["user"],
    });

    return res.json({
      success: true,
      message: "Band members retrieved successfully",
      bandMembers: bandMembers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve band members",
      error: error,
    });
  }
};

const kickBandMember = async (req: Request, res: Response) => {
  try {
    const bandId = req.body.band_id;
    const userId = req.body.user_id;

    console.log("bandId:", bandId);
    console.log("userId:", userId);
    console.log("bandLeader:", req.token.id);

    const band = await Band.findOne({
      where: { id: bandId },
      relations: ['members', 'members.user'],
    });

    if (!band) {
      return res.status(404).json({
        success: false,
        message: "Band not found",
      });
    }

    const isBandLeader = band.band_leader === req.token.id;

    if (!isBandLeader) {
      return res.status(403).json({
        success: false,
        message: "You are not the band leader. Access denied.",
      });
    }
    // revisar, no hace falta
    await band.reload();

    console.log("All Band Members:", band.members);

    const bandMember = band.members.find(member => member.user && member.user.id === userId);

    console.log("Found Band Member:", bandMember);

    if (!bandMember) {
      return res.status(404).json({
        success: false,
        message: "User not found in the band",
      });
    }

    await BandMember.remove(bandMember);

    return res.json({
      success: true,
      message: "User kicked from the band successfully",
    });
  } catch (error) {
    console.error('Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to kick user from the band',
      // error: error.message,
    });
  }
};

export {
  register,
  login,
  profile,
  updateProfile,
  joinBand,
  leaveBand,
  getBandMembers,
  kickBandMember,
};
