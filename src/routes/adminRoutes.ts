import { Router } from "express";
import { getAllusers } from "../controllers/adminController";
import { auth } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

// get all users
router.get("/allusers", auth, isAdmin, getAllusers);

export { router };
