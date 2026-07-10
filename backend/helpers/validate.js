function validateStudySet(data) {
  // Top-level shape
  if (!data || typeof data !== "object") {
    return { valid: false, reason: "Response is not an object" };
  }

  // Topic
  if (typeof data.topic !== "string" || data.topic.trim().length === 0) {
    return { valid: false, reason: "Missing or empty 'topic' field" };
  }

  // Flashcards
  if (!Array.isArray(data.flashcards)) {
    return { valid: false, reason: "'flashcards' is not an array" };
  }
  if (data.flashcards.length === 0) {
    return { valid: false, reason: "'flashcards' array is empty" };
  }
  for (let i = 0; i < data.flashcards.length; i++) {
    const fc = data.flashcards[i];
    if (typeof fc.id !== "string" || fc.id.trim().length === 0) {
      return { valid: false, reason: `flashcards[${i}] has missing or empty 'id'` };
    }
    if (typeof fc.front !== "string" || fc.front.trim().length === 0) {
      return { valid: false, reason: `flashcards[${i}] has missing or empty 'front'` };
    }
    if (typeof fc.back !== "string" || fc.back.trim().length === 0) {
      return { valid: false, reason: `flashcards[${i}] has missing or empty 'back'` };
    }
  }

  // Quiz
  if (!Array.isArray(data.quiz)) {
    return { valid: false, reason: "'quiz' is not an array" };
  }
  if (data.quiz.length === 0) {
    return { valid: false, reason: "'quiz' array is empty" };
  }
  for (let i = 0; i < data.quiz.length; i++) {
    const q = data.quiz[i];
    if (typeof q.id !== "string" || q.id.trim().length === 0) {
      return { valid: false, reason: `quiz[${i}] has missing or empty 'id'` };
    }
    if (typeof q.question !== "string" || q.question.trim().length === 0) {
      return { valid: false, reason: `quiz[${i}] has missing or empty 'question'` };
    }
    if (!Array.isArray(q.options)) {
      return { valid: false, reason: `quiz[${i}] 'options' is not an array` };
    }
    if (q.options.length !== 4) {
      return {
        valid: false,
        reason: `quiz[${i}] has ${q.options.length} options instead of exactly 4`,
      };
    }
    for (let j = 0; j < q.options.length; j++) {
      if (typeof q.options[j] !== "string" || q.options[j].trim().length === 0) {
        return { valid: false, reason: `quiz[${i}].options[${j}] is missing or empty` };
      }
    }
    if (typeof q.correctIndex !== "number" || q.correctIndex < 0 || q.correctIndex > 3) {
      return {
        valid: false,
        reason: `quiz[${i}] 'correctIndex' must be a number between 0 and 3`,
      };
    }
    if (typeof q.explanation !== "string" || q.explanation.trim().length === 0) {
      return { valid: false, reason: `quiz[${i}] has missing or empty 'explanation'` };
    }
  }

  return { valid: true };
}

module.exports = { validateStudySet };
