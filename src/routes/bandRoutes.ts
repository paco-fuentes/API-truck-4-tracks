import { Router } from "express";
import { createBand } from "../controllers/bandController";
import { auth } from "../middleware/auth";
import { isUser } from "../middleware/isUser";

const router = Router();

router.post("/register", auth, isUser, createBand);

export { router };
