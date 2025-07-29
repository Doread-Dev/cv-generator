const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getUserInfo,
} = require("../controllers/userController.js");

router.post("/signup", signup);
router.post("/login", login);
router.get("/userinfo", getUserInfo);

module.exports = router;
