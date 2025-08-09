const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "No auth token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token format invalid" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Token verification failed" });
    }

    req.user = decoded.id;
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};
