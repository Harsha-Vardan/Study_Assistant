import { useState } from 'react';

export default function Flashcard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective w-full h-48 sm:h-56 cursor-pointer select-none"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`card-inner w-full h-full ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="card-face card flex flex-col items-center justify-center text-center h-full w-full absolute">
          <span className="text-xs text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">
            Term
          </span>
          <p className="text-base sm:text-lg font-medium text-[var(--color-text)] leading-relaxed">
            {front}
          </p>
          <span className="mt-3 text-xs text-[var(--color-text-muted)]">
            Click to reveal
          </span>
        </div>

        {/* Back */}
        <div className="card-face card-back card flex flex-col items-center justify-center text-center h-full w-full absolute border-[var(--color-primary)]/30">
          <span className="text-xs text-[var(--color-primary)] mb-2 uppercase tracking-wide">
            Definition
          </span>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
            {back}
          </p>
          <span className="mt-3 text-xs text-[var(--color-text-muted)]">
            Click to flip back
          </span>
        </div>
      </div>
    </div>
  );
}
