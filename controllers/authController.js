import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* POST /api/auth/register
    (use once to seed the first admin, or protect behind a flag) */
export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log("registerAdmin called with:", { email, password });

  if (!email || !password) {
    console.log("Missing email or password");
    return res.status(400).json({ msg: "Email and password required" });
  }

  const existing = await Admin.findOne({ email });
  console.log("Existing admin:", existing);

  if (existing) {
    console.log("Admin already exists");
    return res.status(409).json({ msg: "Admin already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  console.log("Password hash generated");

  const admin = await Admin.create({ email, passwordHash });
  console.log("Admin created:", admin);

  res.status(201).json({ id: admin._id, email: admin.email });
};

/* POST /api/auth/login */
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log("loginAdmin called with:", { email, password });

  const admin = await Admin.findOne({ email });
  console.log("Admin found:", admin);

  if (!admin) {
    console.log("Invalid credentials: admin not found");
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, admin.passwordHash);
  console.log("Password match:", match);

  if (!match) {
    console.log("Invalid credentials: password mismatch");
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  console.log("JWT token generated");

  res.json({ token });
};
