const Groq = require("groq-sdk");
const { buildSystemPrompt, buildUserPrompt, buildRepairPrompt } = require("./prompt");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = "llama-3.3-70b-versatile";

/**
 * Calls Groq chat completions and returns the raw text content.
 */
async function callGroq(systemPrompt, userPrompt) {
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
