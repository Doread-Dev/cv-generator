const express = require("express");
const router = express.Router();
const { AtsController, improveSummaryController, improveResponsibilityController, improveSkillsController } = require("../controllers/aiController");
const queueMiddleware = require("../middleware/requestQueue.js");

router.post("/evaluate-cv", queueMiddleware, AtsController);
// ضيف هون الراوتاات اباا بكر الجدع 
router.post("/improve-summary", queueMiddleware, improveSummaryController);
router.post(
  "/improve-responsibility",
  queueMiddleware,
  improveResponsibilityController
);
router.post("/improve-skills", queueMiddleware, improveSkillsController);


module.exports = router;
