import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ManagerModel from './managerModel'
import ProgrammerModel from './programmerModel'
import ProgrammerList from './component/employee/programmerList.js';
import TaskList from './component/task/taskList.js';
import { Link, browserHistory } from 'react-router';
import { Router, Route, IndexRoute } from 'react-router';
import  CreateUser from './component/employee/createuser.js';
import  UserSignIn from './component/employee/userSignin.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

const App = () => {
  injectTapEventPlugin();
return(
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/managerModel" component={ManagerModel}/>
      <Route path="/programmerModel" component={ProgrammerModel}/>
        <Route path="programmerList" component={ProgrammerList} />
        <Route path="taskList" component={TaskList} />
        <Route path="createUser" component={CreateUser} />
        <Route path="userSignin" component={UserSignIn} />
    </Router>
  </MuiThemeProvider>)}
;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
//        <IndexRoute component={ProgrammerList}/>
//                <Route path="/ProgrammerModel" component={ProgrammerModel}/>
