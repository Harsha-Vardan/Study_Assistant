export default function QuizQuestion({ question, options, selectedIndex, correctIndex, isSubmitted, onSelect }) {
  
  function getOptionStyles(index) {
    if (!isSubmitted) {
      if (selectedIndex === index) {
        return "bg-zinc-800 border-zinc-600 text-zinc-100";
      }
      return "bg-zinc-900/50 border-zinc-800/80 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/50";
    }

    if (index === correctIndex) {
      return "bg-emerald-950/30 border-emerald-900/50 text-emerald-400";
    }
    
    if (selectedIndex === index && index !== correctIndex) {
      return "bg-red-950/30 border-red-900/50 text-red-400";
    }

    return "bg-zinc-900/30 border-zinc-800/50 text-zinc-500 opacity-60";
  }

  function getIconStyles(index) {
    if (!isSubmitted) {
      if (selectedIndex === index) return "bg-zinc-700 text-zinc-200";
      return "bg-zinc-800 text-zinc-400";
    }
    if (index === correctIndex) return "bg-emerald-900/60 text-emerald-400";
    if (selectedIndex === index && index !== correctIndex) return "bg-red-900/60 text-red-400";
    return "bg-zinc-800 text-zinc-600";
  }

  const labels = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-medium text-zinc-100 leading-relaxed">
        {question}
      </h3>
      
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isSubmitted && onSelect(index)}
            disabled={isSubmitted}
            className={`w-full p-4 rounded-xl text-left text-sm transition-all duration-200 border cursor-pointer ${getOptionStyles(index)}`}
          >
            <div className="flex items-start gap-3">
              <span className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-[11px] font-bold mt-0.5 ${getIconStyles(index)}`}>
                {isSubmitted && index === correctIndex ? '✓'
                  : isSubmitted && selectedIndex === index && index !== correctIndex ? '✗'
                  : labels[index]}
              </span>
              <span className="leading-relaxed">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
