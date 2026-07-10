import { useState } from 'react';

export default function InputForm({ onGenerate, isLoading }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) {
      setError('Please enter some notes or a topic first.');
      return;
    }

    setError('');
    onGenerate(text.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <textarea
          id="notes-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
          placeholder="Paste your notes or type a topic here... e.g. 'Photosynthesis' or 'Chapter 3: Cell Biology notes...'"
          rows={6}
          disabled={isLoading}
          className="w-full p-4 rounded-xl resize-none
            bg-[var(--color-surface)] border border-[var(--color-border)]
            text-[var(--color-text)] placeholder-[var(--color-text-muted)]
            focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200"
        />
        <span className="absolute bottom-3 right-3 text-xs text-[var(--color-text-muted)]">
          {text.length} chars
        </span>
      </div>

      {error && (
        <p className="mt-2 text-sm text-[var(--color-error)]">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 w-full py-3 px-6 rounded-xl font-semibold text-white
          bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]
          disabled:opacity-50 disabled:cursor-not-allowed
          active:scale-[0.98] transition-all duration-200
          cursor-pointer"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating...
          </span>
        ) : (
          'Generate Study Set'
        )}
      </button>
    </form>
  );
}
