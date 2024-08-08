const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = await Register.findById(decoded._id);
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
module.exports = isAuthenticated;