import jsonwebtoken from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jsonwebtoken.verify(token.split(" ")[1], "your-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
}

export default verifyToken;
