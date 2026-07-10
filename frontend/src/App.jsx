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
    <div className="app-layout">
      <div className="main-container">
        <header className="mb-10">
          <h1 className="title-main">Study Assistant</h1>
          <p className="subtitle-main">
            Paste your notes, get flashcards & quizzes instantly
          </p>
        </header>

        <InputForm
          onGenerate={handleGenerate}
          isLoading={status === 'loading'}
        />

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
  );
}

export default App;
