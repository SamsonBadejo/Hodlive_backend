import { Router } from "express";
import {
  createEvent,
  getEvents,
  deleteEvents,
} from "../controllers/eventController.js";
import auth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = Router();

router
  .route("/")
  .get(getEvents) // public list
  .post(auth, upload.single("flyer"), createEvent); // admin create
router.delete("/:id", deleteEvents);

export default router;
