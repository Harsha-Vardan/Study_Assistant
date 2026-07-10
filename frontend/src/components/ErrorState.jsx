export default function ErrorState({ message, onRetry }) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-error)]/30 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-error)]/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-[var(--color-error)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-[var(--color-error)] font-medium mb-2">Something went wrong</p>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-5 py-2 rounded-lg font-medium text-sm
              bg-[var(--color-error)]/10 text-[var(--color-error)]
              hover:bg-[var(--color-error)]/20
              active:scale-[0.98] transition-all duration-200
              cursor-pointer"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
