export default function LoadingState() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 space-y-4">
      <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 bg-[var(--color-border)] rounded" />
          <div className="h-4 w-full bg-[var(--color-border)] rounded" />
          <div className="h-4 w-3/4 bg-[var(--color-border)] rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] animate-pulse"
          >
            <div className="h-4 w-3/4 bg-[var(--color-border)] rounded mb-3" />
            <div className="h-3 w-1/2 bg-[var(--color-border)] rounded" />
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-[var(--color-text-muted)] animate-pulse">
        Generating your study set...
      </p>
    </div>
  );
}
