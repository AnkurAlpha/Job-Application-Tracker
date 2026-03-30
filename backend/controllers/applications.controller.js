const pool = require("../db/pool");

async function createApplication(req, res) {
  const jobId = Number(req.body.jobId);
  const name = (req.body.name || "").trim();
  const email = (req.body.email || "").trim();
  const resume = (req.body.resume || "").trim();

  if (!Number.isInteger(jobId) || jobId <= 0 || !name || !email || !resume) {
    return res.status(400).json({ error: "jobId, name, email and resume are required" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const jobExists = await pool.query("SELECT id FROM jobs WHERE id = $1", [jobId]);
    if (jobExists.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    const result = await pool.query(
      `INSERT INTO applications (job_id, name, email, resume)
        VALUES ($1, $2, $3 , $4 )
        RETURNING id , job_id AS "jobId" , name , email, resume, created_at
        AS "createdAt"`,
      [jobId, name, email, resume]
    );
    res.status(201).json({ message: "Application submitted", application: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

async function listApplications(req, res) {
  try {
    const result = await pool.query(
      `SELECT
        a.id,
        a.job_id AS "jobId",
        a.name,
        a.email,
        a.resume,
        a.created_at AS "createdAt",
        j.title AS "jobTitle"
     FROM applications a
     JOIN jobs j ON j.id = a.job_id
     ORDER BY a.id DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = { createApplication, listApplications };
