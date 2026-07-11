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
        <h2 className="text-xl font-semibold text-zinc-100">{studySet.topic}</h2>
        <p className="text-sm text-zinc-400 mt-1">
          {studySet.flashcards.length} flashcards &middot; {studySet.quiz.length} questions
        </p>
      </div>

      {/* Segmented Control (Tabs) */}
      <div className="flex p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl">
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'flashcards'
              ? 'bg-zinc-800 text-zinc-100 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
          }`}
        >
          Flashcards
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'quiz'
              ? 'bg-zinc-800 text-zinc-100 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
          }`}
        >
          Quiz
        </button>
      </div>

      {/* Retest indicator banner */}
      {isRetesting && activeTab === 'quiz' && (
        <div className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
          <span className="text-blue-400 font-medium">
            Retesting {quizQuestions.length} missed question{quizQuestions.length > 1 ? 's' : ''}
          </span>
          <button 
            onClick={handleResetQuiz} 
            className="text-zinc-400 hover:text-zinc-200 underline underline-offset-2 transition-colors"
          >
            Reset Full Quiz
          </button>
        </div>
      )}

      {/* Content Area */}
      <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-4 sm:p-6 shadow-sm">
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
