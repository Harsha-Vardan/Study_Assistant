import { useState, useEffect, useCallback } from 'react';
import Flashcard from './Flashcard';

export default function FlashcardDeck({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : prev));
  }, [flashcards.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [flashcards]);

  const card = flashcards[currentIndex];

  return (
    <div className="space-y-4">
      <div className="flex-between text-muted">
        <span>Flashcards</span>
        <span>{currentIndex + 1} / {flashcards.length}</span>
      </div>

      <div className="progress-bg">
        <div
          className="progress-fill"
          style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
        />
      </div>

      <Flashcard key={card.id} front={card.front} back={card.back} />

      <div className="flex gap-2">
        <button onClick={goPrev} disabled={currentIndex === 0} className="btn-secondary">
          ← Prev
        </button>
        <button onClick={goNext} disabled={currentIndex === flashcards.length - 1} className="btn-secondary">
          Next →
        </button>
      </div>

      <p className="text-muted text-center">
        ↑ ↓ ← → to navigate
      </p>
    </div>
  );
}
