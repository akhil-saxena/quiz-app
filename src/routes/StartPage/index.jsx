import React from 'react';

function StartPage({ startQuiz }) {

    return (
        <div className="home-page">
            <div className="quiz-circle">
                <h1 className="quiz-text">Quiz</h1>
            </div>
            <button className="start-button" onClick={startQuiz}>
                Start Quiz
            </button>
        </div>
    );
}

export default StartPage;