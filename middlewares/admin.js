const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateAdmin = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "You need to login first" });
    }

    let data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = validateAdmin;
