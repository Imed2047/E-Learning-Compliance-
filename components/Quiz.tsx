
import React, { useState, useEffect } from 'react';
import { Quiz as QuizType, QuizQuestion } from '../types';

interface QuizProps {
  quizData: QuizType;
  moduleId: string;
  onQuizComplete: (score: number, total: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ quizData, moduleId, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const score = quizData.questions.reduce((acc, q, index) => {
    const selectedOptionId = selectedAnswers[index];
    const correctOption = q.options.find(opt => opt.correct);
    return acc + (selectedOptionId === correctOption?.id ? 1 : 0);
  }, 0);

  useEffect(() => {
    if (showResults) {
      onQuizComplete(score, quizData.questions.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults, score]);
  
  const handleAnswerSelect = (optionId: string) => {
    if(isAnswered) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionId }));
    setIsAnswered(true);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnswered(false);
    } else {
        setShowResults(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setIsAnswered(false);
  };

  if (showResults) {
    return (
      <div className="mt-6 p-4 bg-slate-100 rounded-lg">
        <h4 className="font-bold text-lg text-slate-800">Résultats du Quiz</h4>
        <p className="mt-2 text-slate-600">
          Votre score : <span className="font-bold text-2xl text-blue-600">{score}</span> / {quizData.questions.length}
        </p>
        <button onClick={handleRetry} className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Refaire le quiz
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 border-t border-slate-200">
      <h4 className="font-bold text-lg text-slate-800">Quiz - Question {currentQuestionIndex + 1}/{quizData.questions.length}</h4>
      <p className="mt-2 text-slate-700">{currentQuestion.question}</p>
      <div className="mt-4 space-y-2">
        {currentQuestion.options.map(option => {
          const isSelected = selectedAnswers[currentQuestionIndex] === option.id;
          let buttonClass = "w-full text-left p-3 border rounded-lg transition-colors ";
          if (isAnswered) {
             if (option.correct) {
                 buttonClass += 'bg-emerald-100 border-emerald-300 text-emerald-900';
             } else if (isSelected && !option.correct) {
                 buttonClass += 'bg-red-100 border-red-300 text-red-900';
             } else {
                buttonClass += 'bg-slate-50 border-slate-200 text-slate-600';
             }
          } else {
              buttonClass += "bg-white border-slate-300 hover:bg-slate-50";
          }
          
          return (
            <button key={option.id} onClick={() => handleAnswerSelect(option.id)} disabled={isAnswered} className={buttonClass}>
              {option.text}
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
            <p className="font-semibold text-blue-800">Explication :</p>
            <p className="text-blue-700">{currentQuestion.explanation}</p>
        </div>
      )}
      {isAnswered && (
         <div className="mt-4 flex justify-end">
            <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                {currentQuestionIndex < quizData.questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
            </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
