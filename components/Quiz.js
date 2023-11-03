

import { useState, useEffect } from 'react';

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    async function fetchQuizQuestions() {
      try {
        const res = await fetch('/questions.json'); 
        const data = await res.json();
        setQuizQuestions(data);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    }

    fetchQuizQuestions();
  }, []);

  const handleAnswerSelection = (questionId, selectedOption) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: selectedOption });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const submitQuiz = () => {
    handleNextQuestion();
    
    console.log(selectedAnswers);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fodbold Quiz</h1>
      {quizCompleted ? (
        <div>
          <h2>Tillykke! Du er færdig med quizzen.</h2>
         
        </div>
      ) : (
        <div key={quizQuestions[currentQuestionIndex]?.id} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{quizQuestions[currentQuestionIndex]?.question}</h3>
          <ul className="space-y-2">
            {quizQuestions[currentQuestionIndex]?.options.map((option) => (
              <li key={option}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`question_${quizQuestions[currentQuestionIndex]?.id}`}
                    value={option}
                    onChange={() => handleAnswerSelection(quizQuestions[currentQuestionIndex]?.id, option)}
                    checked={selectedAnswers[quizQuestions[currentQuestionIndex]?.id] === option}
                    className="mr-2"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={submitQuiz} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            {currentQuestionIndex === quizQuestions.length - 1 ? 'Færdig' : 'Næste spørgsmål'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
