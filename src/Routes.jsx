import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import QuestionPage from './routes/QuestionPage';
import ScorePage from './routes/ScorePage';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/score/:sessionId" component={ScorePage} />
        <Route path="/:sessionId/question/:questionId" component={QuestionPage} />
      </Switch>
    </Router>
  );
}

export default Routes;
