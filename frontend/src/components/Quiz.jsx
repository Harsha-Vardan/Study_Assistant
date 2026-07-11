import { useState, useEffect } from 'react';
import QuizQuestion from './QuizQuestion';

export default function Quiz({ questions, onRetestWrong }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
    setIsSubmitted(false);
    setScore(null);
  }, [questions]);

  const currentQ = questions[currentIndex];
  const allAnswered = Object.keys(answers).length === questions.length;

  function handleSelect(optionIndex) {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));
  }

  function handleSubmit() {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) correct++;
    });
    setScore(correct);
    setIsSubmitted(true);
    setCurrentIndex(0);
  }

  function getWrongQuestionIds() {
    return questions
      .filter((q) => answers[q.id] !== q.correctIndex)
      .map((q) => q.id);
  }

  const scorePercent = score !== null ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Progress & Counter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-zinc-500">
          <span className="uppercase tracking-wider">Quiz</span>
          <span>{currentIndex + 1} of {questions.length}</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-zinc-400 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Score Banner (Shown after submit) */}
      {isSubmitted && score !== null && (
        <div className={`p-6 rounded-2xl border text-center ${
          scorePercent >= 80 ? 'bg-emerald-500/10 border-emerald-500/20' : 
          scorePercent >= 50 ? 'bg-amber-500/10 border-amber-500/20' : 
          'bg-red-500/10 border-red-500/20'
        }`}>
          <p className="text-3xl font-bold text-zinc-100 mb-1">{score} / {questions.length}</p>
          <p className="text-sm font-medium text-zinc-400">{scorePercent}% correct</p>

          {score < questions.length && onRetestWrong && (
            <button 
              onClick={() => onRetestWrong(getWrongQuestionIds())} 
              className="mt-4 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold rounded-xl text-sm transition-all active:scale-[0.98]"
            >
              Retest {questions.length - score} wrong
            </button>
          )}
        </div>
      )}

      {/* Question Card */}
      <div>
        <QuizQuestion
          question={currentQ.question}
          options={currentQ.options}
          selectedIndex={answers[currentQ.id] ?? null}
          correctIndex={currentQ.correctIndex}
          isSubmitted={isSubmitted}
          onSelect={handleSelect}
        />

        {/* Explanation */}
        {isSubmitted && (
          <div className="mt-5 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">
              Explanation
            </span>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))} 
          disabled={currentIndex === 0} 
          className="flex-1 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 text-zinc-200 disabled:text-zinc-600 rounded-xl text-sm font-medium transition-colors disabled:cursor-not-allowed"
        >
          &larr; Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button 
            onClick={() => setCurrentIndex((p) => p + 1)} 
            className="flex-1 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 text-zinc-200 disabled:text-zinc-600 rounded-xl text-sm font-medium transition-colors disabled:cursor-not-allowed"
          >
            Next &rarr;
          </button>
        ) : !isSubmitted ? (
          <button 
            onClick={handleSubmit} 
            disabled={!allAnswered} 
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white disabled:text-zinc-500 rounded-xl text-sm font-semibold transition-colors disabled:cursor-not-allowed"
          >
            Submit Quiz {allAnswered ? '✨' : `(${Object.keys(answers).length}/${questions.length})`}
          </button>
        ) : (
          <button 
            onClick={() => setCurrentIndex(0)} 
            className="flex-1 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-sm font-medium transition-colors"
          >
            Review All
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {questions.map((q, i) => {
          let dotClass = 'w-2 h-2 rounded-full transition-all duration-300 ';
          
          if (i === currentIndex) {
            dotClass += 'scale-125 bg-zinc-200';
          } else if (answers[q.id] !== undefined) {
            if (!isSubmitted) {
              dotClass += 'bg-zinc-600';
            } else if (answers[q.id] === q.correctIndex) {
              dotClass += 'bg-emerald-500';
            } else {
              dotClass += 'bg-red-500';
            }
          } else {
            dotClass += 'bg-zinc-800';
          }
          
          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(i)}
              className={dotClass}
              title={`Question ${i + 1}`}
            />
          );
        })}
      </div>

    </div>
  );
}
