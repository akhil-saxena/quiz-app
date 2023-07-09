import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { MD5 } from 'crypto-js';
import HomePage from './routes/HomePage';
import QuestionPage from './routes/QuestionPage';
import ScorePage from './routes/ScorePage';
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
    const sessionId = MD5(new Date().getTime()).toString();
    const tempResp = {
      "response_code": 200,
      "results": [
        {
          "questionId": 1,
          "questionImage": null,
          "question": "Which of the following is the standard THX subwoofer crossover frequency?",
          "options": [
            "70 Hz",
            "90 Hz",
            "100 Hz",
            "80 Hz"
          ],
          "correct_answer": "80 Hz"
        },
        {
          "questionId": 2,
          "question": "Who built the first laser?",
          "questionImage": "https://media.cnn.com/api/v1/images/stellar/prod/180619203816-green-laser-pointer-stock.jpg",
          "options": [
            "Nikola Tesla",
            "Jack Kilby",
            "Theodore Harold Maiman",
            "Edith Clarke"
          ],
          "correct_answer": "Theodore Harold Maiman"
        },
        {
          "questionId": 3,
          "question": "Which of the following cellular device companies is NOT headquartered in Asia?",
          "questionImage": null,
          "options": [
            "LG Electronics",
            "Samsung",
            "Nokia",
            "HTC"
          ],
          "correct_answer": "Nokia"
        },
        {
          "questionId": 4,
          "question": "Which round does a WW2 M1 Garand fire?",
          "questionImage": null,
          "options": [
            ".308",
            "7.62",
            ".30-06",
            "7.62x51mm"
          ],
          "correct_answer": ".30-06"
        },
        {
          "questionId": 5,
          "question": "Which of the following is used to measure blood pressure?",
          "questionImage": null,
          "options": [
            "Sphygmomanometer",
            "Barometer",
            "Ruler",
            "Haemoerythrometer"
          ],
          "correct_answer": "Sphygmomanometer"
        }
      ]
    };
    
    // Axios.get(API_URL)
    //   .then(res => res.data)
    //   .then(data => {
    //     const questions = data.results.map((question) => ({
    //       ...question,
    //       answers: [...question.options].sort(() => Math.random() - 0.5)
    //     }))
    //     setQuestions(questions);
    //     setCurrentIndex(0);
    //   });
    const questions = tempResp.results.map((question) => ({
      ...question,
      answers: [...question.options].sort(() => Math.random() - 0.5)
    }))
    setQuestions(questions);
    setCurrentIndex(0);
      
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