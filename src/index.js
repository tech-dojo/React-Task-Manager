import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ManagerModel from './managerModel'
import ProgrammerModel from './programmerModel'
import ProgrammerList from './component/employee/programmerList.js';
import TaskList from './component/task/taskList.js';
import {Link, browserHistory} from 'react-router';
import {Router, Route, IndexRoute} from 'react-router';
import CreateUser from './component/employee/createuser.js';
import UserSignIn from './component/employee/userSignin.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

var retrievUser = JSON.parse(localStorage.getItem('localStore'));
console.log('retrievUser: ', retrievUser);

function loggedIn() {
    return retrievUser.user_type;
}

function requireAuth(nextState, replace) {
    // if (loggedIn()==="Manager") {
    //   replace({
    //     pathname: '/managerModel'
    //   })
    // }
    // else if(loggedIn()==="Programmer") {
    //     replace({
    //       pathname: '/programmerModel'
    //     })
    //   }
    //   else{
    //     replace({
    //       pathname: '/userSignin'
    //     })
    //   }
}

// const UserSpecify = () => (function requireAuthBeta(nextState, replace) {
//     // if (loggedIn()!=="Manager") {
//     //   replace({
//     //     pathname: '/userSignin'
//     //   })
//     // }
// }

const App = () => {
    injectTapEventPlugin();

    return (
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={ManagerModel} >
                  <IndexRoute  component={TaskList}/>
                    <Route path="taskList" component={TaskList}/>
                      <Route path="userSignin" component={UserSignIn}/>

                </Route>


                <Route path="createUser" component={CreateUser}/>
            </Router>
        </MuiThemeProvider>
    )
};

ReactDOM.render(
    <App/>, document.getElementById('root'));
//        <IndexRoute component={ProgrammerList}/>
//                <Route path="/ProgrammerModel" component={ProgrammerModel}/>
//       <Route path="/programmerModel" component={ProgrammerModel} onEnter={requireAuth}/>
