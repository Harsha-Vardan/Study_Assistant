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
    <div className="space-y-4">
      <div className="flex-between text-muted">
        <span>Quiz</span>
        <span>{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="progress-bg">
        <div
          className="progress-fill"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {isSubmitted && score !== null && (
        <div className={`p-4 rounded-lg border text-center ${
          scorePercent >= 80 ? 'bg-[var(--color-success)]/5 border-[var(--color-success)]/20' : 
          scorePercent >= 50 ? 'bg-[var(--color-warning)]/5 border-[var(--color-warning)]/20' : 
          'bg-[var(--color-error)]/5 border-[var(--color-error)]/20'
        }`}>
          <p className="text-xl font-bold">{score} / {questions.length}</p>
          <p className="text-muted mt-1">{scorePercent}% correct</p>

          {score < questions.length && onRetestWrong && (
            <button onClick={() => onRetestWrong(getWrongQuestionIds())} className="btn-primary mt-3 inline-block w-auto px-6">
              Retest {questions.length - score} wrong
            </button>
          )}
        </div>
      )}

      <div className="card">
        <QuizQuestion
          question={currentQ.question}
          options={currentQ.options}
          selectedIndex={answers[currentQ.id] ?? null}
          correctIndex={currentQ.correctIndex}
          isSubmitted={isSubmitted}
          onSelect={handleSelect}
        />

        {isSubmitted && (
          <div className="explanation-box">
            <p className="text-xs text-[var(--color-text-muted)] mb-1 font-medium">Explanation</p>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))} disabled={currentIndex === 0} className="btn-secondary">
          ← Prev
        </button>

        {currentIndex < questions.length - 1 ? (
          <button onClick={() => setCurrentIndex((p) => p + 1)} className="btn-secondary">
            Next →
          </button>
        ) : !isSubmitted ? (
          <button onClick={handleSubmit} disabled={!allAnswered} className="btn-primary">
            Submit {allAnswered ? '' : `(${Object.keys(answers).length}/${questions.length})`}
          </button>
        ) : (
          <button onClick={() => setCurrentIndex(0)} className="btn-secondary">
            Review All
          </button>
        )}
      </div>

      <div className="flex-center gap-1.5 mt-2">
        {questions.map((q, i) => {
          let dotClass = 'dot';
          if (i === currentIndex) dotClass += ' active';
          else if (answers[q.id] !== undefined) {
            if (!isSubmitted) dotClass += ' answered';
            else if (answers[q.id] === q.correctIndex) dotClass += ' correct';
            else dotClass += ' incorrect';
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
