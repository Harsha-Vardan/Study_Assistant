export default function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center py-4 mb-2">
        <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          <svg className="animate-spin h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Analyzing your notes...
        </div>
      </div>

      {[1, 2, 3].map((i) => (
        <div key={i} className="p-5 bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl animate-pulse shadow-sm">
          <div className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-800 rounded-md mb-4" />
          <div className="space-y-2.5">
            <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800/80 rounded-md" />
            <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-800/80 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
