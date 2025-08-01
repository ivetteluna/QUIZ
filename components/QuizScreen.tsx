import React, { useState, useEffect } from 'react';
import { Question, QuizConfig } from '../types';

interface QuizScreenProps {
  questions: Question[];
  quizConfig: QuizConfig;
  onFinish: (answers: (number | null)[]) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, quizConfig, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setUserAnswers(Array(questions.length).fill(null));
  }, [questions]);

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newAnswers);
    setIsAnswered(true);

    const isCorrect = selectedOption === questions[currentQuestionIndex].correctAnswerIndex;
    const timeoutDuration = isCorrect ? 1000 : 2500; // 1s for correct, 2.5s for incorrect

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        onFinish(newAnswers);
      }
    }, timeoutDuration);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 selection:bg-purple-300">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2 text-sm font-semibold text-gray-500">
            <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
            <span>{quizConfig.subject}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-10" aria-live="polite" aria-atomic="true">
          <p className="text-3xl font-bold text-gray-800 text-center leading-snug">{currentQuestion.question}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-violet-50 hover:border-purple-400';
            if (isAnswered) {
              if (index === currentQuestion.correctAnswerIndex) {
                buttonClass = 'bg-green-500 border-green-500 text-white animate-pulse';
              } else if (index === selectedOption) {
                buttonClass = 'bg-rose-500 border-rose-500 text-white';
              } else {
                 buttonClass = 'bg-gray-100 border-gray-200 text-gray-500 opacity-60';
              }
            } else if (selectedOption === index) {
              buttonClass = 'bg-purple-500 border-purple-500 text-white ring-4 ring-purple-200';
            }
            
            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                disabled={isAnswered}
                className={`w-full p-5 rounded-xl text-left font-semibold text-lg transition-all duration-200 transform ${!isAnswered ? 'hover:scale-105 active:scale-100' : ''} ${buttonClass}`}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-12 flex justify-end">
          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === null || isAnswered}
            className="px-10 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Siguiente' : 'Finalizar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;