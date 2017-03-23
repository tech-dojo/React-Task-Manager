import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Model from './Model'
import EmployeeList from './component/employee/employeeList.js';
import TaskList from './component/task/taskList.js';
import { Link, browserHistory } from 'react-router';
import { Router, Route, IndexRoute } from 'react-router';
import  CreateUser from './component/employee/createuser.js';
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
          <Route path="createUser" component={CreateUser} />

      </Route>
    </Router>
  </MuiThemeProvider>)}
;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
