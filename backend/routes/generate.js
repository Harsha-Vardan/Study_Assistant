const { callGroq, parseModelJSON, buildSystemPrompt, buildUserPrompt, buildRepairPrompt } = require("../helpers/groqClient");
const { validateStudySet } = require("../helpers/validate");

/**
 * POST /api/generate
 * Takes { text }, calls Groq, validates the response, retries once if invalid.
 * Returns { ok: true, data } or { ok: false, error }.
 */
async function generateStudySet(req, res, next) {
  try {
    const { text } = req.body;
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(text);

    // ── First attempt ──
    let raw = await callGroq(systemPrompt, userPrompt);
    let parsed;
    let validation;

    try {
      parsed = parseModelJSON(raw);
      validation = validateStudySet(parsed);
    } catch (parseErr) {
      validation = { valid: false, reason: `JSON parse error: ${parseErr.message}` };
    }

    // ── Retry once if invalid ──
    if (!validation.valid) {
      console.log(`First attempt failed: ${validation.reason}. Retrying...`);
      const repairPrompt = buildRepairPrompt(text, validation.reason);

      try {
        raw = await callGroq(systemPrompt, repairPrompt);
        parsed = parseModelJSON(raw);
        validation = validateStudySet(parsed);
      } catch (retryErr) {
        validation = { valid: false, reason: `Retry failed: ${retryErr.message}` };
      }
    }

    // ── Final check ──
    if (!validation.valid) {
      console.error(`Both attempts failed: ${validation.reason}`);
      return res.json({
        ok: false,
        error: "Couldn't generate a valid study set. Please try again or add more detail to your notes.",
      });
    }

    // ── Success ──
    return res.json({ ok: true, data: parsed });

  } catch (err) {
    next(err);
  }
}

module.exports = { generateStudySet };
