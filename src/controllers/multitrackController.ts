import { Request, Response } from "express";
import { BandMultitrack } from "../models/BandMultitrack";
import { Band } from "../models/Band";

const createMultitrack = async (req: Request, res: Response) => {
  try {
    const project_title = req.body.project_title;
    const img_url = req.body.img_url;
    const is_active = req.body.is_active;

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

export { createMultitrack };
