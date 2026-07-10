export default function QuizQuestion({ question, options, selectedIndex, correctIndex, isSubmitted, onSelect }) {

  function getOptionClass(index) {
    let classes = 'quiz-option';
    if (!isSubmitted) {
      if (selectedIndex === index) classes += ' selected';
    } else {
      if (index === correctIndex) classes += ' correct';
      else if (selectedIndex === index) classes += ' incorrect';
      else classes += ' disabled';
    }
    return classes;
  }

  function getIconClass(index) {
    let classes = 'quiz-icon';
    if (!isSubmitted) {
      if (selectedIndex === index) classes += ' selected';
    } else {
      if (index === correctIndex) classes += ' correct';
      else if (selectedIndex === index) classes += ' incorrect';
    }
    return classes;
  }

  const labels = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-3">
      <p className="text-sm sm:text-base font-medium text-[var(--color-text)] leading-relaxed">
        {question}
      </p>
      <div className="space-y-1.5">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isSubmitted && onSelect(index)}
            disabled={isSubmitted}
            className={getOptionClass(index)}
          >
            <span className="flex items-center gap-2.5">
              <span className={getIconClass(index)}>
                {isSubmitted && index === correctIndex ? '✓'
                  : isSubmitted && selectedIndex === index && index !== correctIndex ? '✗'
                  : labels[index]}
              </span>
              <span>{option}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
