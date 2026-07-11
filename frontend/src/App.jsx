import { useState, useRef, useCallback } from 'react';
import { generateStudySet } from './api';
import InputForm from './components/InputForm';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';
import StudySetView from './components/StudySetView';

function App() {
  const [status, setStatus] = useState('idle');
  const [studySet, setStudySet] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const requestIdRef = useRef(0);

  const handleGenerate = useCallback(async (text) => {
    const currentRequestId = ++requestIdRef.current;
    setStatus('loading');
    setErrorMessage(null);

    const result = await generateStudySet(text);

    if (currentRequestId !== requestIdRef.current) {
      return;
    }

    if (result.ok) {
      setStudySet(result.data);
      setStatus('success');
    } else {
      setErrorMessage(result.error);
      setStatus('error');
    }
  }, []);

  const handleRetry = useCallback(() => {
    setStatus('idle');
    setErrorMessage(null);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-blue-500/30">
      <div className="max-w-2xl mx-auto px-5 py-12 sm:py-20">
        
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            Study Assistant
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Paste your notes, get flashcards & quizzes instantly.
          </p>
        </header>

        {/* Input area */}
        <InputForm
          onGenerate={handleGenerate}
          isLoading={status === 'loading'}
        />

        {/* Dynamic States */}
        <div className="mt-8 transition-all duration-300 ease-in-out">
          {status === 'loading' && <LoadingState />}
          
          {status === 'error' && (
            <ErrorState message={errorMessage} onRetry={handleRetry} />
          )}

          {status === 'idle' && !studySet && <EmptyState />}

          {status === 'success' && studySet && (
            <StudySetView key={studySet.topic} studySet={studySet} />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
