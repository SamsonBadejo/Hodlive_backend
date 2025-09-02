// middlewares/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store flyers in uploads/flyers
    const dir = file.fieldname === "audio" ? "uploads/audio" : "uploads/flyers";

    // Create the folder if it doesn't exist
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // unique filename
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

export default multer({ storage });
