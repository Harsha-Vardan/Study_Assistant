require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const { validateInput } = require("./middleware/validateInput");
const { errorHandler } = require("./middleware/errorHandler");
const { generateStudySet } = require("./routes/generate");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Global Middleware ──
app.use(cors());
app.use(express.json());

// ── API Routes ──
app.post("/api/generate", validateInput, generateStudySet);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ── Serve Frontend in Production ──
// This allows you to host both backend and frontend on a single server (e.g. Render)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Fallback for React Router (using Regex to avoid Express 5 path-to-regexp wildcard issues)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ── Error Handler (must be after API routes) ──
app.use(errorHandler);

// ── Start ──
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
