import { Router } from "express";
import { auth } from "../middleware/auth";
import { isUser } from "../middleware/isUser";
import { deleteMessage, editMessage, getAllBandMessages, postMessage } from "../controllers/messageController";

const router = Router();

router.post("/band/:id", auth, isUser, postMessage);
router.put("/band/:id", auth, isUser, editMessage);
router.delete("/band/:id", auth, isUser, deleteMessage);

router.get("/band/:id", getAllBandMessages);

export { router };