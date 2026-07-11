export default function EmptyState() {
  return (
    <div className="py-12 px-6 border-2 border-dashed border-zinc-800 rounded-2xl text-center">
      <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800 text-xl">
        📚
      </div>
      <p className="text-zinc-300 font-medium mb-1">
        No study set generated yet
      </p>
      <p className="text-sm text-zinc-500">
        Enter some notes above and click generate.
      </p>
    </div>
  );
}
