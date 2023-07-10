# React Quiz App

This is a simple React quiz application that allows users to answer multiple-choice questions and get their score at the end. The app fetches questions from an API, calculates response times, and sends the answers to an API endpoint for scoring.

## Features

- Display multiple-choice questions with randomized answer options.
- Calculate and track the user's score based on correct answers.
- Calculate the response time for each question.
- Send the user's answers and session information to an API for scoring.

## Technologies Used

- React
- Axios
- crypto-js

## Getting Started

Follow the instructions below to run the React quiz app on your local machine.

### Prerequisites

Make sure you have the following software installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine:
```git clone https://github.com/akhil-saxena/quiz-app.git```

2. Navigate to the project directory:
```cd quiz-app```

3. Install the dependencies:
```npm i```

4. Start the development server:
```npm start```

5. Open your browser and visit `http://localhost:3000` to access the app.


## Usage

1. The app starts with a homepage that displays a "Start Quiz" button.

2. Click on the "Start Quiz" button to begin the quiz.

3. The app fetches questions from the provided API endpoint and presents them one by one.

4. Select the answer for each question by clicking on the options.

5. Click the "Submit" button to submit your answer for each question.

6. After answering all the questions, the app displays your score and the number of correct and incorrect answers.

7. Click the "Restart Quiz" button to start a new quiz.
