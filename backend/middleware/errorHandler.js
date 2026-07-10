/**
 * Catches Groq-specific and generic errors, returns { ok: false, error }.
 * Mounted after routes so Express passes unhandled errors here.
 */
function errorHandler(err, req, res, next) {
  console.error("Server error:", err.message);

  if (err.status === 429) {
    return res.status(429).json({
      ok: false,
      error: "Rate limited — please wait a moment and try again.",
    });
  }

  return res.status(500).json({
    ok: false,
    error: "Something went wrong on the server. Please try again.",
  });
}

module.exports = { errorHandler };
