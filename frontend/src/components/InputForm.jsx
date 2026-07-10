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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
          placeholder="Paste your notes or type a topic..."
          rows={5}
          disabled={isLoading}
          className="input-field"
        />
        <span className="absolute bottom-3 right-4 text-xs text-[var(--color-text-muted)]">
          {text.length}
        </span>
      </div>

      {error && (
        <p className="mt-2 text-sm text-[var(--color-error)]">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full mt-3"
      >
        {isLoading ? (
          <span className="flex-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
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
