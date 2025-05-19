const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");

const router = express.Router();



router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/current", currentUser);

router.get("/current", (req, res) => {
  res.json({ message: "Current user information" });
});

module.exports = router;