const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const jobs = [
  { id: 1, title: "Frontend Intern", description: "React + APIs" },
  { id: 2, title: "Backend Intern", description: "Node + PostgreSQL" },
];

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/jobs", (req, res) => res.json(jobs));

app.get("/jobs/:id", (req, res) => {
  const id = Number(req.params.id);
  const job = jobs.find((j) => j.id === id);
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json(job);
});

app.post("/applications", (req, res) => {
  const { jobId, name, email, resume } = req.body;

  if (!jobId || !name || !email || !resume) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  res.status(201).json({ message: "Application submitted successfully" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

