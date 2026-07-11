const Groq = require("groq-sdk");
const { buildSystemPrompt, buildUserPrompt, buildRepairPrompt } = require("./prompt");

// Initialize with a dummy key if missing so the server doesn't crash on startup.
// We will catch the missing key in the route handler.
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "MISSING_KEY" });
const MODEL = "llama-3.3-70b-versatile";

/**
 * Calls Groq chat completions and returns the raw text content.
 */
async function callGroq(systemPrompt, userPrompt) {
  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "MISSING_KEY") {
    throw new Error("GROQ_API_KEY environment variable is missing on the server.");
  }

  const response = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 4096,
  });

  return response.choices[0]?.message?.content || "";
}

/**
 * Attempts to parse the model's response as JSON.
 * Strips markdown code fences if the model wraps them anyway.
 */
function parseModelJSON(raw) {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/```\s*$/, "");
  }
  return JSON.parse(cleaned);
}

module.exports = { callGroq, parseModelJSON, buildSystemPrompt, buildUserPrompt, buildRepairPrompt };
