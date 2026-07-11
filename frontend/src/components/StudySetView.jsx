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
    <div className="space-y-6">
      
      {/* Topic Header */}
      <div className="text-center sm:text-left mt-2">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{studySet.topic}</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          {studySet.flashcards.length} flashcards &middot; {studySet.quiz.length} questions
        </p>
      </div>

      {/* Segmented Control (Tabs) */}
      <div className="tabs-wrapper">
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

      {/* Retest indicator banner */}
      {isRetesting && activeTab === 'quiz' && (
        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl text-sm">
          <span className="text-blue-700 dark:text-blue-400 font-medium">
            Retesting {quizQuestions.length} missed question{quizQuestions.length > 1 ? 's' : ''}
          </span>
          <button 
            onClick={handleResetQuiz} 
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 underline underline-offset-2 transition-colors"
          >
            Reset Full Quiz
          </button>
        </div>
      )}

      {/* Content Area */}
      <div className="card-container">
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

    </div>
  );
}
