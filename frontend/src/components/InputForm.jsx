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
          className="w-full p-4 pb-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none text-sm leading-relaxed shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="absolute bottom-3 right-4 flex items-center justify-between pointer-events-none">
          <span className="text-xs text-zinc-500 font-medium">
            {text.length} chars
          </span>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400 font-medium px-1">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-4 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold py-3 px-4 rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-zinc-900" viewBox="0 0 24 24" fill="none">
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
