import { Router } from "express";
import {
  createSermon,
  getSermons,
  deleteSermon,
} from "../controllers/sermonController.js";
import auth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = Router();

router
  .route("/")
  .get(getSermons) // public list
  .post(auth, upload.single("audio"), createSermon); // admin create

router.delete("/:id", deleteSermon);

export default router;
