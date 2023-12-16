import { Response, Request } from "express";
import { Band } from "../models/Band";

const createBand = async (req: Request, res: Response) => {
  try {
    const band_leader = req.token.id;

    const band_name = req.body.band_name;
    const about = req.body.about;
    const img_url = req.body.img_url;
    const hiring = req.body.hiring;
    const is_active = req.body.is_active;

    const newBand = await Band.create({
      band_leader: band_leader,
      band_name: band_name,
      about: about,
      img_url: img_url,
      hiring: hiring,
      is_active: is_active,
    }).save();

    return res.json({
      success: true,
      message: "New band created succesfully",
      token: newBand,
    });
  } catch (error) {
    console.log();
    
    return res.status(500).json({
      success: false,
      message: "Band can't be created",
      error: error,
    });
  }
};

export { createBand };