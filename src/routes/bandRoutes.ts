import { Router } from "express";
import {
  createBand,
  getUserBandByTokenId,
} from "../controllers/bandController";
import { auth } from "../middleware/auth";
import { isUser } from "../middleware/isUser";

const router = Router();

// create band
router.post("/register", auth, isUser, createBand);

// get single band by atuh token id
router.get("/myband", auth, isUser, getUserBandByTokenId);

export { router };
