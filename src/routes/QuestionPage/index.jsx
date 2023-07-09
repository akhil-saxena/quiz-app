import React, { useState } from 'react';

function QuestionPage({ question, options, handleAnswer,questionImage, progress }) {
  const [selectedOption, setSelectedOption] = useState('');

  const submitAnswer = () => {
      
  }


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      handleAnswer(selectedOption);
      setSelectedOption('');
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