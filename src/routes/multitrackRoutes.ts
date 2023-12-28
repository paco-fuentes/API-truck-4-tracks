import { Router } from "express";
import { auth } from "../middleware/auth";
import { isUser } from "../middleware/isUser";
import { createMultitrack, createTrack } from "../controllers/multitrackController";

const router = Router();

// create multitrack as band leader
router.post("/create/:id", auth, isUser, createMultitrack)
// load a track to multitrack
router.post("/loadtrack/:id", auth, isUser, createTrack)

export { router };