import Sermon from "../models/Sermon.js";
import { fetchYouTubeMeta } from "../utils/youtube.js";

export const createSermon = async (req, res) => {
  try {
    const { title, description, youtubeLink } = req.body;

    // Cloudinary URL for audio file (if uploaded)
    const audioUrl = req.file ? req.file.path : null;

    // Fetch YouTube metadata (thumbnail etc.)
    const youtubeThumb = youtubeLink ? await fetchYouTubeMeta(youtubeLink) : null;

    const sermon = await Sermon.create({
      title,
      description,
      youtubeLink,
      youtubeThumb,
      audioUrl,
    });

    res.status(201).json(sermon);
  } catch (error) {
    console.error("Create sermon error:", error);
    res.status(500).json({ message: "Server error while creating sermon" });
  }
};

export const getSermons = async (_req, res) => {
  try {
    const sermons = await Sermon.find().sort({ createdAt: -1 });
    res.json(sermons);
  } catch (error) {
    console.error("Get sermons error:", error);
    res.status(500).json({ message: "Server error while fetching sermons" });
  }
};

export const deleteSermon = async (req, res) => {
  try {
    const sermon = await Sermon.findByIdAndDelete(req.params.id);
    if (!sermon) {
      return res.status(404).json({ message: "Sermon not found" });
    }
    res.status(200).json({ message: "Sermon deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error while deleting sermon" });
  }
};
