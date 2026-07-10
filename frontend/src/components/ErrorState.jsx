export default function ErrorState({ message, onRetry }) {
  return (
    <div className="card mt-8 border-[var(--color-error)]/20 text-center">
      <p className="text-sm font-medium text-[var(--color-error)] mb-1">Something went wrong</p>
      <p className="text-sm text-[var(--color-text-muted)] mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary px-4 py-2">
          Try Again
        </button>
      )}
    </div>
  );
}
