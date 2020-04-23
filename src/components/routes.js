import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import VacancyGraph from './VacancyGraph';

const sampleData = [
      { x: "Q1\n2018", y: 26.8, label: "Awesome" },
      { x: "Q2\n2018",y: 26.1,label: "Not too bad"},
      { x: "Q3\n2018", y: 30.0, label: "The market 8%, \nwith Class A vacancy rates decreasing by 10 bps to 17.5% and Class B remaining constant at 15.0%" },
      { x: "Q4\n2018", y: 25.8, label: "Bad" },
      { x: "Q1\n2019", y: 26, label: "So so" },
      { x: "Q2\n2019", y: 26.2, label: "Okay" },
      { x: "Q3\n2019", y: 26.5, label: "Now ya talking" },
      { x: "Q4\n20419", y: 26.2, label: "Okay" }
    ]
const Routes = () => (
    <Router>
  <Switch>
    <Route
      exact={true}
      path="/"
      render={props => <VacancyGraph {...props} marketdata={sampleData} graphwidth={600} graphheight={600}/>}
    />
    <Route
      path="*"
      // component={ErrorPageComponent}
      render={() => <div>404 page or redirect</div>}
      key="errorRoute"
    />
  </Switch>
  </Router>
);

export default Routes;
