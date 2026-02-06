import jwt from "jsonwebtoken";

export function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.user_metadata.username,
      avatar: user.user_metadata.avatar
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
