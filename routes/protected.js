const express = require("express");
const protect = require ("../middleware/AuthMiddleware")

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted",
    userId: req.user,
  });
});



router.get("/test", protect, (req, res) => {
  res.json({ message: "Protected route" });
});




module.exports = router;
