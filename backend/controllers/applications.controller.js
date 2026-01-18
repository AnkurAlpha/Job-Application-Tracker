let applications = []; // temporary storage (will become DB later)

function createApplication(req, res) {
  const { jobId, name, email, resume } = req.body;

  if (!jobId || !name || !email || !resume) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newApp = {
    id: applications.length + 1,
    jobId: Number(jobId),
    name,
    email,
    resume,
    createdAt: new Date().toISOString(),
  };

  applications.push(newApp);

  return res.status(201).json({ message: "Application submitted", application: newApp });
}

function listApplications(req, res) {
  res.json(applications);
}

module.exports = { createApplication, listApplications };

