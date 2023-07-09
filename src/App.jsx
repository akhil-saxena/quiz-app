import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { MD5 } from 'crypto-js';
import HomePage from './routes/StartPage';
import QuestionPage from './routes/QuestionPage';
import ScorePage from './routes/ScorePage';
import './App.css'
import { API_QUESTIONS_URL } from './constants';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    if (quizStarted) {
      fetchQuestions();
    }
  }, [quizStarted]);

  const fetchQuestions = () => {
    const sessionId = MD5(new Date().getTime()).toString();
    setSessionId(sessionId);
    Axios.get(API_URL)
      .then(res => res.data)
      .then(data => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [...question.options].sort(() => Math.random() - 0.5)
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
    <div className="container gradient-background">
      <div className="container-box">
        {showScore ? (
          <ScorePage
            score={score}
            correctAnswers={score}
            totalQuestions={questions.length}
            sessionId={sessionId}
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
                questionImage={questions[currentIndex].questionImage}
                sessionId={sessionId}
                currentIndex={currentIndex}
                handleAnswer={handleAnswer}
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