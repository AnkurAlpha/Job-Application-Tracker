const router = require("express").Router();
const { getAllJobs, getJobById } = require("../controllers/jobs.controller");

router.get("/", getAllJobs);
router.get("/:id", getJobById);

module.exports = router;
