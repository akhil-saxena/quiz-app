import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_SUBMIT_URL } from '../../constants';
function QuestionPage({ question, options, handleAnswer,questionImage, progress, sessionId, currentIndex }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    setStartTime(performance.now()); // Start the timer when the question appears
  }, []);


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const handleSubmit = () => {
    if (selectedOption) {
      handleAnswer(selectedOption);
      setSelectedOption('');
      const currentTime = performance.now(); // Record the current time
    const responseTime = Math.round((currentTime - startTime) * 100) / 100000; // Calculate and round the response time
      const payload = {
        sessionId: sessionId,
        questionId: currentIndex+1,
        selectedOption,
        responseTime
      };
      Axios.post(API_SUBMIT_URL, payload)
        .then(response => {
          // Handle the response if needed
        })
        .catch(error => {
          // Handle errors if needed
        });
    }
  };

  return (
    <div className="question-page">
      <div className="header">
        <div className="progress-circle">
          <div className="progress-text">{progress}%</div>
        </div>
      </div>
      <div className="question">
        <h2>{question}</h2>
        {questionImage && <img className='question-image' src={questionImage} alt="Question" />}

      </div>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button className={`submit-button ${!selectedOption ? 'disabled' : ''}`} onClick={handleSubmit} disabled={!selectedOption}>Submit</button>
    </div>
  );
}

export default QuestionPage;