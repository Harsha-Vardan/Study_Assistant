export default function EmptyState() {
  return (
    <div className="mt-8 p-8 rounded-lg border border-dashed border-[var(--color-border)] text-center">
      <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
        No study set yet
      </p>
      <p className="text-sm text-[var(--color-text-muted)]">
        Enter your notes or a topic above to get started.
      </p>
    </div>
  );
}
