import { Request, Response } from "express";
import { BandMessage } from "../models/BandMessage";
import { BandMember } from "../models/BandMember";

const postMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.token.id;
    const bandId = parseInt(req.params.id);
    const { message } = req.body;
    // console.log(bandId, userId, message);

    const isMember = await BandMember.findOne({
      where: { user_id: userId, band_id: bandId },
    });

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of the band. Access denied.",
      });
    }

    const newMessage = await BandMessage.create({
      user_id: userId,
      band_id: bandId,
      message: message,
      is_active: true,
    }).save();

    return res.json({
      success: true,
      message: "Message posted successfully",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to post the message",
      error: error,
    });
  }
};

const editMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.token.id;
    const messageId = req.body.message_id;
    const { message } = req.body;

    const existingMessage = await BandMessage.findOneBy({
      id: messageId,
      user_id: userId,
    });

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found or you don't have permission to edit it",
      });
    }

    existingMessage.message = message;
    const updatedMessage = await existingMessage.save();

    return res.json({
      success: true,
      message: "Message updated successfully",
      data: updatedMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update the message",
      error: error,
    });
  }
};

const deleteMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.token.id;
    const messageId = req.body.message_id;

    const existingMessage = await BandMessage.findOneBy({
      id: messageId,
      user_id: userId,
    });

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found or you don't have permission to delete it",
      });
    }

    await existingMessage.remove();

    return res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete the message",
      error: error,
    });
  }
};

const getAllBandMessages = async (req: Request, res: Response) => {
  try {
    const bandId = parseInt(req.params.id);

    const bandMessages = await BandMessage.find({
      where: { band_id: bandId },
      relations: ["user"],
    });

    return res.json({
      success: true,
      message: "All band messages retrieved successfully",
      bandMessages: bandMessages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve band messages",
      error: error,
    });
  }
};

export { postMessage, getAllBandMessages, editMessage, deleteMessage };
