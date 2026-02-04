const pool = require("../db/pool")

async function getAllJobs(req, res) {
    try {
        const result = await pool.query("SELECT id, title, description FROM jobs ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
}


async function getJobById(req, res) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid job id" });
    }
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
