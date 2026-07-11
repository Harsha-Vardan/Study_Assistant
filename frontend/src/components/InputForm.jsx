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
      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
          placeholder="What would you like to study?"
          rows={4}
          disabled={isLoading}
          className="input-field"
        />
        <div className="absolute bottom-3 right-4 flex items-center justify-between pointer-events-none">
          <span className="text-xs text-muted font-medium">
            {text.length} chars
          </span>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500 dark:text-red-400 font-medium px-1">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating...
          </>
        ) : (
          'Generate Study Set ✨'
        )}
      </button>
    </form>
  );
}
