export default function EmptyState() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] border-dashed text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">
          Ready to study?
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] max-w-sm mx-auto">
          Paste your notes or type a topic above, and we'll generate flashcards and a quiz to help you learn.
        </p>
      </div>
    </div>
  );
}
