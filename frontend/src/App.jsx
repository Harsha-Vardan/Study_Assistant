import { useState, useRef, useCallback } from 'react';
import { generateStudySet } from './api';
import InputForm from './components/InputForm';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';

function App() {
  // ── Top-level state machine ──
  const [status, setStatus] = useState('idle');       // 'idle' | 'loading' | 'success' | 'error'
  const [studySet, setStudySet] = useState(null);     // StudySet | null
  const [errorMessage, setErrorMessage] = useState(null);
  const requestIdRef = useRef(0);                     // Race-guard

  const handleGenerate = useCallback(async (text) => {
    // Increment requestId — any in-flight response with a stale ID will be discarded
    const currentRequestId = ++requestIdRef.current;
    setStatus('loading');
    setErrorMessage(null);

    const result = await generateStudySet(text);

    // Race-guard: only apply if this is still the latest request
    if (currentRequestId !== requestIdRef.current) {
      return; // Stale response — silently discard
    }

    if (result.ok) {
      setStudySet(result.data);
      setStatus('success');
    } else {
      setErrorMessage(result.error);
      setStatus('error');
      // Note: previous studySet is NOT wiped — user can still see old results
    }
  }, []);

  const handleRetry = useCallback(() => {
    // Reset to idle so user can re-enter or re-submit
    setStatus('idle');
    setErrorMessage(null);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-8 sm:py-12">
      {/* Header */}
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
          Study Assistant
        </h1>
        <p className="mt-2 text-[var(--color-text-muted)] text-sm sm:text-base">
          Paste your notes, get flashcards & quizzes instantly
        </p>
      </header>

      {/* Input Form — always visible */}
      <InputForm
        onGenerate={handleGenerate}
        isLoading={status === 'loading'}
      />

      {/* Content area — driven by status */}
      {status === 'loading' && <LoadingState />}

      {status === 'error' && (
        <ErrorState message={errorMessage} onRetry={handleRetry} />
      )}

      {status === 'idle' && !studySet && <EmptyState />}

      {status === 'success' && studySet && (
        <div className="w-full max-w-2xl mx-auto mt-8">
          <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <h2 className="text-xl font-semibold mb-2">{studySet.topic}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              {studySet.flashcards.length} flashcards · {studySet.quiz.length} quiz questions
            </p>
            <p className="mt-4 text-sm text-[var(--color-accent)]">
              ✓ Study set generated — flashcard & quiz components coming next!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
