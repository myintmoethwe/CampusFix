const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

const allowRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const userRole = String(req.user.role || "").toUpperCase();

    const roles = allowedRoles.map((role) => String(role).toUpperCase());

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "You don't have permission!",
      });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  allowRole,
};
