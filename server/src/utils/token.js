// server/utils/token.js
import jwt from "jsonwebtoken";

function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export { generateToken };