export default function LoadingState() {
  return (
    <div className="mt-8 space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card animate-pulse">
          <div className="h-4 w-1/3 bg-[var(--color-border)] rounded mb-3" />
          <div className="h-3 w-full bg-[var(--color-border)] rounded mb-2" />
          <div className="h-3 w-2/3 bg-[var(--color-border)] rounded" />
        </div>
      ))}

      <p className="text-center text-xs text-[var(--color-text-muted)]">
        Generating your study set...
      </p>
    </div>
  );
}
