import { Router } from "express";
import { deleteUserById, getAllusers } from "../controllers/adminController";
import { auth } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

// get all users
router.get("/allusers", auth, isAdmin, getAllusers);

// remove user by body id
router.delete("/usertoremove", auth, isAdmin, deleteUserById)

export { router };
