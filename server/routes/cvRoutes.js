const express = require("express");
const router2 = express.Router();
const { createCv, auth, getUserCVs } = require("../controllers/cvController");

router2.post("/savecv", auth, createCv);
router2.get("/mycvs", auth, getUserCVs);

module.exports = router2;
