// controllers/sermonController.js   (ES module)

import Sermon from "../models/Sermon.js";
import { fetchYouTubeMeta } from "../utils/youtube.js";

export const createSermon = async (req, res) => {
  const { title, description, youtubeLink } = req.body;

  const audioUrl = req.file ? `/uploads/audio/${req.file.filename}` : null;

  const youtubeThumb = youtubeLink ? await fetchYouTubeMeta(youtubeLink) : null;

  const sermon = await Sermon.create({
    title,
    description,
    youtubeLink,
    youtubeThumb,
    audioUrl,
  });

  res.status(201).json(sermon);
};

export const getSermons = async (_req, res) => {
  const sermons = await Sermon.find().sort({ createdAt: -1 });
  res.json(sermons);
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
