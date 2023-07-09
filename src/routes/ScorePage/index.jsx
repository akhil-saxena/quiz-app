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
                <h2>Correct Answers: {correctAnswers}</h2>
                <h2>Incorrect Answers: {totalQuestions - correctAnswers}</h2>
            </div>
            <button className="restart-button" onClick={restartQuiz}>
                Restart Quiz
            </button>
        </div>
    );
}

export default ScorePage;