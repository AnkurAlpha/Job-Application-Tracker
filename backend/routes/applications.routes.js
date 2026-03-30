const router = require("express").Router();
const { createApplication, listApplications } = require("../controllers/applications.controller");
const { verifyToken, requireAdmin } = require("../middleware/auth.middleware");

router.post("/", createApplication);
router.get("/", verifyToken, requireAdmin, listApplications);

module.exports = router;
