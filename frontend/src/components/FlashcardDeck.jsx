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
    <div className="space-y-6">
      
      {/* Progress & Counter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-zinc-500">
          <span className="uppercase tracking-wider">Flashcards</span>
          <span>{currentIndex + 1} of {flashcards.length}</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-zinc-500 dark:bg-zinc-400 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* The Card */}
      <div className="relative">
        <Flashcard key={card.id} front={card.front} back={card.back} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button 
          onClick={goPrev} 
          disabled={currentIndex === 0}
          className="btn-secondary"
        >
          &larr; Previous
        </button>
        <button 
          onClick={goNext} 
          disabled={currentIndex === flashcards.length - 1}
          className="btn-secondary"
        >
          Next &rarr;
        </button>
      </div>

      <p className="text-center text-xs text-zinc-500 font-medium">
        Use arrow keys (&larr; &rarr;) to navigate
      </p>

    </div>
  );
}
