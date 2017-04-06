import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ManagerModel from './managerModel'
import ProgrammerModel from './programmerModel'
import ProgrammerTask from './component/task/programmerTask.js';
import TaskList from './component/task/taskList.js';
import {Link, browserHistory} from 'react-router';
import {Router, Route, IndexRoute} from 'react-router';
import CreateUser from './component/employee/createuser.js';
import UserSignIn from './component/employee/userSignin.js';
import injectTapEventPlugin from 'react-tap-event-plugin';


function loggedIn() {
    return retrievUser.user_type;
}
function isManager(retrievUser)
{
  return retrievUser.user_type==="Manager"
}

function isProgrammer(retrievUser)
{
  return retrievUser.user_type==="Programmer"
}
function requireAuth(nextState, replace) {
  var retrievUser = JSON.parse(localStorage.getItem('localStore'));
  console.log('retrievUser: ', retrievUser);
    if (retrievUser=== undefined || retrievUser===null) {
      replace({
        pathname: '/userSignin'
      })
    }
    else if(!isManager(retrievUser)) {
        replace({
          pathname: '/userSignin'
        })
      }
}

function requireAuthBeta(nextState, replace) {

  var retrievUser = JSON.parse(localStorage.getItem('localStore'));
  console.log('retrievUser: ', retrievUser);

    if (retrievUser=== undefined || retrievUser===null) {
      replace({
        pathname: '/userSignin'
      })
    }
    else if(!isProgrammer(retrievUser)) {
        replace({
          pathname: '/userSignin'
        })
      }
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
                <Route path="/" component={ManagerModel} onEnter={requireAuth} >
                  <IndexRoute  component={TaskList} />
                    <Route path="taskList" component={TaskList}/>
                </Route>

                <Route path="/programmerModel" component={ProgrammerModel} onEnter={requireAuthBeta}>
                  <IndexRoute component={ProgrammerTask}/>
                  <Route path="programmerModel" component={ProgrammerTask}/>
                </Route>
                <Route path="userSignin" component={UserSignIn}/>
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
// <Route path="/programmerModel" component={ProgrammerModel}>
//   <IndexRoute  path="/programmerModel" component={ProgrammerTask}/>
//   <Route path="programmerTask" component={ProgrammerTask}/>
// </Route>
