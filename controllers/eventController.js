import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    // Cloudinary gives you a ready-to-use CDN URL
    const flyerUrl = req.file ? req.file.path : null;

    const event = await Event.create({
      ...req.body,
      flyerUrl, // store the Cloudinary URL
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({ message: "Server error while creating event" });
  }
};

export const getEvents = async (_req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // oldest → newest
    res.json(events);
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({ message: "Server error while fetching events" });
  }
};

export const deleteEvents = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error while deleting event" });
  }
};
