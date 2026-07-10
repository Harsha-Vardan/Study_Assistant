const API_URL = '/api/generate';
const TIMEOUT_MS = 15000;

/**
 * Calls the backend to generate a study set.
 * @param {string} text - The notes/topic to generate from
 * @param {AbortSignal} [signal] - Optional abort signal for cancellation
 * @returns {Promise<{ok: boolean, data?: object, error?: string}>}
 */
export async function generateStudySet(text, signal) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  // If an external signal is provided, listen for it too
  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        ok: false,
        error: errorData?.error || `Server error (${response.status}). Please try again.`,
      };
    }

    return await response.json();

  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      return {
        ok: false,
        error: 'Request timed out. Please try again.',
      };
    }

    return {
      ok: false,
      error: 'Network error — make sure the server is running.',
    };
  }
}
