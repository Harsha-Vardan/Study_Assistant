import { useState } from 'react';
import FlashcardDeck from './FlashcardDeck';
import Quiz from './Quiz';

export default function StudySetView({ studySet }) {
  const [activeTab, setActiveTab] = useState('flashcards');
  const [quizQuestions, setQuizQuestions] = useState(studySet.quiz);

  function handleRetestWrong(wrongIds) {
    const wrongQuestions = studySet.quiz.filter((q) => wrongIds.includes(q.id));
    setQuizQuestions(wrongQuestions);
    setActiveTab('quiz');
  }

  function handleResetQuiz() {
    setQuizQuestions(studySet.quiz);
  }

  const isRetesting = quizQuestions.length < studySet.quiz.length;

  return (
    <div className="spacing-y">
      <div>
        <h2 className="title-section">{studySet.topic}</h2>
        <p className="text-muted mt-1">
          {studySet.flashcards.length} flashcards · {studySet.quiz.length} questions
        </p>
      </div>

      <div className="tabs-container">
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`tab-btn ${activeTab === 'flashcards' ? 'active' : ''}`}
        >
          Flashcards
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
        >
          Quiz
        </button>
      </div>

      {isRetesting && activeTab === 'quiz' && (
        <div className="alert-warning">
          <span>
            Retesting {quizQuestions.length} wrong answer{quizQuestions.length > 1 ? 's' : ''}
          </span>
          <button onClick={handleResetQuiz} className="btn-link">
            Reset
          </button>
        </div>
      )}

      {activeTab === 'flashcards' && (
        <FlashcardDeck flashcards={studySet.flashcards} />
      )}

      {activeTab === 'quiz' && (
        <Quiz
          key={quizQuestions.length}
          questions={quizQuestions}
          onRetestWrong={handleRetestWrong}
        />
      )}
    </div>
  );
}
