const pool = require("../db/pool")

async function getAllJobs(req, res) {
    const result = await pool.query("SELECT id, title , description \
        FROM jobs ORDER BY id ");
    res.json(result.rows)
}

async function getJobById(req, res) {
    const id = Number(req.params.id);
    const result = await pool.query(
        "SELECT id,  title , description FROM jobs WHERE id = $1",
        [id]
    );
    if (result.rows.length === 0) {
        return res.status(404).json({ error: "Job not found" })
    }
    res.json(result.rows[0])
}

module.exports = { getAllJobs, getJobById }

// while testing without postgres
// const jobs = [
//   { id: 1, title: "Frontend Intern", description: "React + APIs" },
//   { id: 2, title: "Backend Intern", description: "Node + PostgreSQL" },
// ];
//
// function getAllJobs(req, res) {
//   res.json(jobs);
// }
//
// function getJobById(req, res) {
//   const id = Number(req.params.id);
//   const job = jobs.find((j) => j.id === id);
//
//   if (!job) return res.status(404).json({ error: "Job not found" });
//   res.json(job);
// }
//
// module.exports = { getAllJobs, getJobById };
//
