import { Router } from "express";
import { login, profile, register, updateProfile } from "../controllers/userController";
import { auth } from "../middleware/auth";
import { isUser } from "../middleware/isUser";

const router = Router();

// no auth
router.post("/register", register);
router.post("/login", login);

// with auth
router.get("/profile", auth, isUser, profile);
router.put("/profile", auth, isUser, updateProfile)

export { router };
