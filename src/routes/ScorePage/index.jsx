import React from 'react';
import { useParams } from 'react-router-dom';

function ScorePage({ score, correctAnswers, totalQuestions, restartQuiz }) {
    const { sessionId } = useParams();

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