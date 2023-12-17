import { Response, Request } from "express";
import { Band } from "../models/Band";
import { BandMultitrack } from "../models/BandMultitrack";
import { Track } from "../models/Track";
import { BandMember } from "../models/BandMember";
// import { User } from "../models/User";

const createBand = async (req: Request, res: Response) => {
  try {
    const band_leader = req.token.id;

    const band_name = req.body.band_name;
    const about = req.body.about;
    const img_url = req.body.img_url;
    const hiring = req.body.hiring;
    const is_active = req.body.is_active;

    // create band
    const newBand = await Band.create({
      band_leader: band_leader,
      band_name: band_name,
      about: about,
      img_url: img_url,
      hiring: hiring,
      is_active: is_active,
    }).save();

    // suscribe as a member
    const bandMember = await BandMember.create({
      band_id: newBand.id,
      user_id: band_leader,
      is_active: true,
    }).save();

    return res.json({
      success: true,
      message: "Band created successfully",
      band: newBand,
      bandMember: bandMember,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Band can't be created",
      error: error,
    });
  }
};

const getUserBandByTokenId = async (req: Request, res: Response) => {
  try {
    const user_id = req.token.id;
    const userBand = await Band.findOne({ where: { band_leader: user_id } });

    // if (!userBand) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "user's band not found",
    //   });
    // }

    const bandMultitracks = await BandMultitrack.find({
      where: { band_id: userBand?.id },
    });
    const trackPromises = bandMultitracks.map(async (multitrack) => {
      const tracks = await Track.find({
        where: { multitrack_id: multitrack.id },
      });
      return { multitrack, tracks };
    });

    const bandMultitracksWithTracks = await Promise.all(trackPromises);

    return res.json({
      success: true,
      message: "Band, Multitrack, and Track information retrieved successfully",
      data: {
        band: userBand,
        multitracks: bandMultitracksWithTracks,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Band, Multitrack, and Track information can't be retrieved",
      error: error,
    });
  }
};

export { createBand, getUserBandByTokenId };
