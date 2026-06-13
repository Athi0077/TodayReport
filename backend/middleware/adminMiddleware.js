const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json("No token");
    }

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (verified.role !== "admin") {
      return res.status(403).json("Access Denied");
    }

    req.user = verified;

    next();

  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = adminMiddleware;