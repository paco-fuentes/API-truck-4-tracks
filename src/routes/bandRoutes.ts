import { Router } from "express";
import {
  createBand,
  getAllBands,
  getBandById,
  getUserBandByTokenId,
} from "../controllers/bandController";
import { auth } from "../middleware/auth";
import { isUser } from "../middleware/isUser";

const router = Router();

// ---------- LOGED USER -------- >

// create band
router.post("/register", auth, isUser, createBand);

// ---------- BAND LEADER

// get single band by auth token id as band admin / leader
router.get("/myband", auth, isUser, getUserBandByTokenId);

// update single band by auth token id as band admin / leader deleting messages / tracks / members and band properties like is_active

// ---------- BAND MEMBERS

// join band
// leave band
// get my bands

// post track as ban member
// update track as ban member
// delete track as ban member

// post message as band member
// update message as band member
// delete message as band member

// < ---------- ALL USERS

// get all bands
router.get("/all", getAllBands);
// get bandByBodyId
// router.get("/selected", getBandById);
// get bandById
router.get("/:id", getBandById);

export { router };
