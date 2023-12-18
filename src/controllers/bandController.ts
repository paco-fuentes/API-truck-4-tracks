import { Response, Request } from "express";
import { Band } from "../models/Band";
import { BandMultitrack } from "../models/BandMultitrack";
import { Track } from "../models/Track";
import { BandMember } from "../models/BandMember";
import { GenreBand } from "../models/GenreBand";
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

const getAllBands = async (req: Request, res: Response) => {
  try {
    const bands = await Band.find({ relations: ["leader"] });
    const formattedBands = await Promise.all(
      bands.map(async (band) => {
        const genreBands = await GenreBand.find({
          where: { band: { id: band.id } },
          relations: ["genre"],
        });
        const genreNames = genreBands.map(
          (genreBand) => genreBand.genre?.genre_name
        );

        return {
          id: band.id,
          band_name: band.band_name,
          about: band.about,
          img_url: band.img_url,
          hiring: band.hiring,
          is_active: band.is_active,
          created_at: band.created_at,
          updated_at: band.updated_at,
          band_leader: {
            id: band.leader.id,
            username: band.leader.username,
          },
          genre_names: genreNames,
        };
      })
    );

    return res.json({
      success: true,
      message: "All bands retrieved successfully",
      data: formattedBands,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Bands can't be retrieved",
      error: error,
    });
  }
};

// const getAllBands = async (req: Request, res: Response) => {
//   try {
//     const bands = await Band.find();

//     return res.json({
//       success: true,
//       message: "All bands retrieved successfully",
//       data: bands,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Bands can't be retrieved",
//       error: error,
//     });
//   }
// };

const getBandByBodyId = async (req: Request, res: Response) => {
  try {
    const band_id = req.body.band_id;
    const band = await Band.findOneBy(band_id);

    if (!band) {
      return res.status(404).json({
        success: false,
        message: "Band not found",
      });
    }

    return res.json({
      success: true,
      message: "Band retrieved successfully",
      data: band,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Band can't be retrieved",
      error: error,
    });
  }
};

const getBandById = async (req: Request, res: Response) => {
  try {
    const band_id = req.params.id;
    console.log(band_id);

    const band = await Band.findOne({
      where: { id:parseInt(band_id as string) },
    });

    if (!band) {
      return res.status(404).json({
        success: false,
        message: "Band not found",
      });
    }

    const bandMultitracks = await BandMultitrack.find({
      where: { id: band_id as any},
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
      message: "Band retrieved successfully",
      data: {
        band: band,
        multitracks: bandMultitracksWithTracks,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Band can't be retrieved",
      error: error,
    });
  }
};

export { createBand, getUserBandByTokenId, getAllBands, getBandById, getBandByBodyId };
