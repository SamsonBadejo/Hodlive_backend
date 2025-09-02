// controllers/eventController.js
import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  let flyerUrl = null;

  if (req.file) {
    flyerUrl = `${req.protocol}://${req.get("host")}/uploads/flyers/${
      req.file.filename
    }`;
  }

  const event = await Event.create({
    ...req.body,
    flyerUrl,
  });

  res.status(201).json(event);
};

export const getEvents = async (_req, res) => {
  const events = await Event.find().sort({ date: 1 }); // oldest → newest
  res.json(events);
};


export const deleteEvents = async (req, res) => {
  try {
    const sermon = await Event.findByIdAndDelete(req.params.id);
    if (!sermon) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error while deleting sermon" });
  }
};