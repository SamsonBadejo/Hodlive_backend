// middlewares/upload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary.js"; // path to the config above

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: file.fieldname === "audio" ? "uploads/audio" : "uploads/flyers",
      resource_type: file.fieldname === "audio" ? "auto" : "image",
      allowed_formats: ["jpg", "png", "jpeg", "mp3", "mp4", "wav"],
    };
  },
});

const upload = multer({ storage });

export default upload;
