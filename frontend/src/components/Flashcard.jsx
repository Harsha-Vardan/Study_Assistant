import { useState } from 'react';

export default function Flashcard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective w-full h-56 sm:h-64 cursor-pointer select-none group"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`card-inner w-full h-full ${flipped ? 'flipped' : ''}`}>
        
        {/* Front (Term) */}
        <div className="card-face absolute inset-0 w-full h-full p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors">
          <span className="absolute top-5 left-5 text-[10px] sm:text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Term
          </span>
          <p className="text-lg sm:text-xl font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed max-w-full overflow-y-auto">
            {front}
          </p>
          <span className="absolute bottom-5 text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 font-medium">
            Click to reveal
          </span>
        </div>

        {/* Back (Definition) */}
        <div className="card-face card-back absolute inset-0 w-full h-full p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl flex flex-col items-center justify-center text-center shadow-md">
          <span className="absolute top-5 left-5 text-[10px] sm:text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
            Definition
          </span>
          <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed max-w-full overflow-y-auto">
            {back}
          </p>
        </div>

      </div>
    </div>
  );
}
