import { Router } from "express";
import {
  checkIsBandMember,
  getBandMembers,
  joinBand,
  kickBandMember,
  leaveBand,
  login,
  profile,
  register,
  updateProfile,
} from "../controllers/userController";
import { auth } from "../middleware/auth";
import { isUser } from "../middleware/isUser";

const router = Router();

// no auth
router.post("/register", register);
router.post("/login", login);
// get band members
router.get("/bandmembers/:band_id", auth, isUser, getBandMembers);

// with auth
router.get("/profile", auth, isUser, profile);
router.put("/profile", auth, isUser, updateProfile);

// join and leave a band
router.post("/joinband", auth, isUser, joinBand);
router.post("/leaveband", auth, isUser, leaveBand);

// kick band member as band leader
router.post("/kickmember", auth, isUser, kickBandMember);

// isMember
router.get("/ismember/:id", auth, isUser, checkIsBandMember);


export { router };
