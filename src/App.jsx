import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import HomePage from './pages/StartPage';
import QuestionPage from './pages/QuestionPage';
import ScorePage from './pages/ScorePage';
import './App.css'

const API_URL = "https://akhil-quiz-app.free.beeceptor.com/questions";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted) {
      fetchQuestions();
    }
  }, [quizStarted]);

  const fetchQuestions = () => {
    Axios.get(API_URL)
      .then(res => res.data)
      .then(data => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5)
        }))
        setQuestions(questions);
        setCurrentIndex(0);
      });
  }

  const startQuiz = () => {
    setQuizStarted(true);
  }
  const handleAnswer = (answer) => {
    if (answer === questions[currentIndex].correct_answer) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setCurrentIndex(-1);
    setShowScore(false);
    setQuizStarted(false);
  }

  return (
    <div className="container">
      <div className="container-box">
        {showScore ? (
          <ScorePage
            score={score}
            correctAnswers={score}
            totalQuestions={questions.length}
            restartQuiz={handleRestartQuiz}
          />
        ) : (
          <>
            {!quizStarted ? (
              <HomePage startQuiz={startQuiz} />
            ) : currentIndex !== -1 ? (
              <QuestionPage
                question={questions[currentIndex].question}
                options={questions[currentIndex].answers}
                handleAnswer={handleAnswer}
                isLoading={false}
                progress={((currentIndex + 1) / questions.length) * 100}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default App;