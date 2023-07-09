import React, { useEffect } from 'react';
import axios from 'axios';
import { API_SCORE_URL } from '../../constants';

function ScorePage({ score, correctAnswers, totalQuestions, sessionId, restartQuiz }) {
    useEffect(() => {
        const payload = {
          sessionId: sessionId
        };
        axios.post(API_SCORE_URL, payload)
          .then(response => {
            // Handle the response if needed
          })
          .catch(error => {
            // Handle errors if needed
          });
      }, []);

    
    return (
        <div className="score-page">
            <div className="header">
                <div className="score-circle">
                    <h1>{score}</h1>
                </div>
            </div>
            <div className="result">
                <div className='score-container'>
                <h2 className="correct-answers">Correct Answers: <span>{correctAnswers}</span></h2>
                </div>
                <div className='score-container'>
                <h2 className="incorrect-answers">Incorrect Answers: <span>{totalQuestions - correctAnswers}</span></h2>
                </div>
            </div>
            <button className="restart-button" onClick={restartQuiz}>
                Restart Quiz
            </button>
        </div>
    );
}

export default ScorePage;