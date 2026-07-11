/**
 * Prompt builders for Groq API calls.
 * Separated from server.js for clarity and easy tuning.
 */

const STUDY_SET_SCHEMA = `{
  "topic": "string — concise name for the study set",
  "flashcards": [
    {
      "id": "string — unique identifier like 'fc1', 'fc2'",
      "front": "string — the term, question, or concept",
      "back": "string — the definition, answer, or explanation"
    }
  ],
  "quiz": [
    {
      "id": "string — unique identifier like 'q1', 'q2'",
      "question": "string — a clear multiple-choice question",
      "options": ["string — exactly 4 options"],
      "correctIndex": "number — 0, 1, 2, or 3 indicating the correct option",
      "explanation": "string — brief explanation of why the answer is correct"
    }
  ]
}`;

/**
 * Builds the system prompt that instructs the model to return
 * a structured JSON study set matching our schema.
 */
function buildSystemPrompt() {
  return `You are a study assistant that generates structured study materials.

When given a topic or notes, you MUST respond with ONLY a valid JSON object matching this exact schema — no markdown, no code fences, no explanation outside the JSON:

${STUDY_SET_SCHEMA}

Rules:
- Generate 5-8 flashcards covering the key concepts
- Generate 8-10 quiz questions testing understanding
- Each quiz question MUST have exactly 4 options
- correctIndex MUST be a number from 0 to 3
- Every id must be unique within its array
- Keep content concise but educational
- Respond with ONLY the JSON object, nothing else`;
}

/**
 * Builds the user prompt from the input text.
 */
function buildUserPrompt(text) {
  return `Generate a study set for the following topic/notes:\n\n${text}`;
}

/**
 * Builds a repair prompt when the first attempt returned invalid JSON.
 * Includes the specific error so the model can fix it.
 */
function buildRepairPrompt(originalText, errorMessage) {
  return `Your previous response did not match the required schema. The error was: "${errorMessage}"

Please try again. Generate a study set for the following topic/notes, and respond with ONLY valid JSON matching the schema — no markdown, no code fences:

${originalText}`;
}

module.exports = {
  buildSystemPrompt,
  buildUserPrompt,
  buildRepairPrompt,
};
