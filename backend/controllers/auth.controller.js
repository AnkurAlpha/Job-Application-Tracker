const jwt = require("jsonwebtoken");

function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password are required" });
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword || !process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Server auth configuration missing" });
  }

  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username: adminUsername, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  return res.json({ token });
}

module.exports = { login };
