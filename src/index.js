import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Model from './Model'
import EmployeeList from './employeeList.js';
import TaskList from './taskList.js';
import { Link, browserHistory } from 'react-router';
import { Router, Route, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

const App = () => {
  injectTapEventPlugin();
return(
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={Model}>
        <IndexRoute component={EmployeeList}/>
        <Route path="employeeList" component={EmployeeList} />
        <Route path="taskList" component={TaskList} />
      </Route>
    </Router>
  </MuiThemeProvider>)}
;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
