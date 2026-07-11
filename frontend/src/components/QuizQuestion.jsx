export default function QuizQuestion({ question, options, selectedIndex, correctIndex, isSubmitted, onSelect }) {
  
  function getOptionClass(index) {
    let classes = "quiz-option";
    
    if (!isSubmitted) {
      if (selectedIndex === index) return classes + " selected";
      return classes;
    }

    if (index === correctIndex) return classes + " correct";
    if (selectedIndex === index && index !== correctIndex) return classes + " incorrect";
    return classes + " disabled";
  }

  function getIconClass(index) {
    let classes = "quiz-icon";
    
    if (!isSubmitted) {
      if (selectedIndex === index) return classes + " selected";
      return classes;
    }
    
    if (index === correctIndex) return classes + " correct";
    if (selectedIndex === index && index !== correctIndex) return classes + " incorrect";
    return classes;
  }

  const labels = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">
        {question}
      </h3>
      
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isSubmitted && onSelect(index)}
            disabled={isSubmitted}
            className={getOptionClass(index)}
          >
            <div className="flex items-start gap-3">
              <span className={getIconClass(index)}>
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
