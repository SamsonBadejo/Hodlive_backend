import { Router } from "express";
import {
  createContact,
  getContacts,
  deleteContacts,
} from "../controllers/contactController.js";
import auth from "../middlewares/authMiddleware.js";

const router = Router();

// anyone can send a message
router.post("/", (req, res, next) => {
  console.log("POST /contact - Body:", req.body);
  createContact(req, res, next);
});

// only signed-in admin can view messages
router.get("/", auth, (req, res, next) => {
  console.log("GET /contact - User:", req.user);
  getContacts(req, res, next);
});

router.delete("/:id", deleteContacts);

export default router;
