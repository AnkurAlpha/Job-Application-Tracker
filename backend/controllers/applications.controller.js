// let applications = []; // temporary storage (will become DB later)

const { application } = require("express");
const pool = require("../db/pool")
async function createApplication(req, res) {
    const { jobId, name, email, resume } = req.body;
    if (!jobId || !name || !email || !resume) {
        return res.status(400).json({ erro: "Missing required fields" });
    }
    const result = await pool.query(
        `INSERT INTO applications ( job_id, name , email , resume)
        VALUES ($1, $2, $3 , $4 )
        RETURNING id , job_id AS "jobId" , name , email, resume, created_at
        AS "createdAt" ` , [Number(jobId), name, email, resume]
    )
    res.status(201).json({message: "Application submitted",application: result.rows[0]});
}

async function listApplications(req, res) {
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
}
module.exports = { createApplication, listApplications };


/// prev code (without database)
// function createApplication(req, res) {
//   const { jobId, name, email, resume } = req.body;
//
//   if (!jobId || !name || !email || !resume) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }
//
//   const newApp = {
//     id: applications.length + 1,
//     jobId: Number(jobId),
//     name,
//     email,
//     resume,
//     createdAt: new Date().toISOString(),
//   };
//
//   applications.push(newApp);
//
//   return res.status(201).json({ message: "Application submitted", application: newApp });
// }
//
// function listApplications(req, res) {
//   res.json(applications);
// }
//
// module.exports = { createApplication, listApplications };
//
