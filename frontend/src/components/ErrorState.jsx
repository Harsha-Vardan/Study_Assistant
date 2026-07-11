export default function ErrorState({ message, onRetry }) {
  return (
    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
      <p className="text-red-400 font-semibold mb-2">Failed to generate</p>
      <p className="text-sm text-red-400/80 mb-5">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium rounded-xl transition-colors active:scale-[0.98]"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
