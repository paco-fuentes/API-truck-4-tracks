import { Router } from "express";
import { auth } from "../middleware/auth";
import { isUser } from "../middleware/isUser";
import { createMultitrack } from "../controllers/multitrackController";

const router = Router();

// create multitrack as band leader
router.post("/create/:id", auth, isUser, createMultitrack)

export { router };