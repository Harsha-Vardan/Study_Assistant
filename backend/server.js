require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { validateInput } = require("./middleware/validateInput");
const { errorHandler } = require("./middleware/errorHandler");
const { generateStudySet } = require("./routes/generate");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Global Middleware ──
app.use(cors());
app.use(express.json());

// ── Routes ──
app.post("/api/generate", validateInput, generateStudySet);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ── Error Handler (must be after routes) ──
app.use(errorHandler);

// ── Start ──
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
