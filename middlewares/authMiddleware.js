// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

/** Verify a Bearer token and attach the admin payload to req.admin */
export default (req, res, next) => {
  const authHeader = req.headers.authorization ?? "";
  console.log("Authorization Header:", authHeader); // Debug

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
  console.log("Extracted Token:", token); // Debug

  if (!token) {
    console.log("No token provided"); // Debug
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Admin Payload:", req.admin); // Debug
    return next();
  } catch (err) {
    console.log("JWT Error:", err.name, err.message); // Debug
    return res.status(401).json({ msg: "Token invalid", error: err.name });
  }
};
