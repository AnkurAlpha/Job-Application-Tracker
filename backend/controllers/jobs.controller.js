const jobs = [
  { id: 1, title: "Frontend Intern", description: "React + APIs" },
  { id: 2, title: "Backend Intern", description: "Node + PostgreSQL" },
];

function getAllJobs(req, res) {
  res.json(jobs);
}

function getJobById(req, res) {
  const id = Number(req.params.id);
  const job = jobs.find((j) => j.id === id);

  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json(job);
}

module.exports = { getAllJobs, getJobById };

