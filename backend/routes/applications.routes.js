const router = require("express").Router();
const { createApplication, listApplications } = require("../controllers/applications.controller");

router.post("/", createApplication);
router.get("/", listApplications); // for dashboard later

module.exports = router;
