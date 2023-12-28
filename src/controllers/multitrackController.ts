import { Request, Response } from "express";
import { BandMultitrack } from "../models/BandMultitrack";
import { Band } from "../models/Band";
import { BandMember } from "../models/BandMember";
import { Track } from "../models/Track";

const createMultitrack = async (req: Request, res: Response) => {
  try {
    const project_title = req.body.project_title;
    const img_url = req.body.img_url;
    const is_active = req.body.is_active;

    console.log(req.params.id, req.token.id, req.body);

    // Usuario logueado
    const userId = req.token.id;
    // ID de la banda actual
    const bandId = parseInt(req.params.id);
    // Encuentra la banda
    const bands = await Band.findBy({
      id: bandId,
    });

    // verificar si hay elementos en el array...
    if (!bands.length) {
      return res.status(404).json({
        success: false,
        message: "band not found",
      });
    }
    const band = bands[0];
    // es bandleader?
    const isBandLeader = band.band_leader === userId;

    if (!isBandLeader) {
      return res.json({
        success: false,
        message: isBandLeader
          ? "User is the band leader"
          : "User is not the band leader",
      });
    }

    const newMultitrack = await BandMultitrack.create({
      band_id: bandId,
      project_title: project_title,
      img_url: img_url,
      is_active: is_active,
    }).save();
    console.log(newMultitrack);

    return res.json({
      success: true,
      message: "Band leader created multitrack successfully",
      data: newMultitrack,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to check if user is band leader",
      error: error,
    });
  }
};

const createTrack = async (req: Request, res: Response) => {
  try {
    const track_name = req.body.track_name;
    const img_url = req.body.img_url;
    const track_url = req.body.track_url;
    const is_active = req.body.is_active;

    // página de la banda
    const bandId = parseInt(req.params.id);
    // usuario logueado
    const userId = req.token.id;
    // id del multitrack actual
    const multitrackId = req.body.id;
    // encuentra el multitrack
    // const multitrack = await BandMultitrack.findBy({
    //   id: multitrackId,
    // });

    const bandMember = await BandMember.find({
      where: { band_id: bandId, user_id: userId },
    });

    if (!bandMember) {
      return res.json({
        success: false,
        message: bandMember
          ? "User is band member"
          : "User is not band member",
      });
    }

    const newTrack = await Track.create({
      multitrack_id: multitrackId,
      user_id: userId,
      track_name: track_name,
      img_url: img_url,
      track_url: track_url,
      is_active: is_active,
    }).save();
    console.log(newTrack);

    return res.json({
      success: true,
      message: "Track loaded successfully",
      data: newTrack,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load the track",
      error: error,
    });
  }
};

export { createMultitrack, createTrack };
