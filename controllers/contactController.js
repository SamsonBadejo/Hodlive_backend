import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  console.log("createContact called with body:", req.body);
  try {
    const contact = await Contact.create(req.body);
    console.log("Contact created successfully:", contact);
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to create contact" });
  }
};

export const getContacts = async (req, res) => {
  console.log("getContacts called");
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log("Contacts found:", contacts);
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

export const deleteContacts = async (req, res) => {
  try {
    const contacts = await Contact.findByIdAndDelete(req.params.id);
    if (!contacts) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error while deleting contact" });
  }
};
