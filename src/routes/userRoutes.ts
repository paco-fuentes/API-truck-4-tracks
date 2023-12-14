import { Router } from "express";
import { login, profile, register } from "../controllers/userController";
import { auth } from "../middleware/auth";
import { isUser } from "../middleware/isUser";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", auth, isUser, profile);

export { router };
