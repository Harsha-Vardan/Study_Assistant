/**
 * Validates that the request body contains non-empty text.
 * Returns 400 with { ok: false, error } if invalid, else calls next().
 */
function validateInput(req, res, next) {
  const { text } = req.body;

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return res.status(400).json({
      ok: false,
      error: "Please provide some text or a topic to generate a study set.",
    });
  }

  // Attach trimmed text so the route doesn't have to
  req.body.text = text.trim();
  next();
}

module.exports = { validateInput };
