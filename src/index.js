import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

const App = () => {     injectTapEventPlugin();
return(
  <MuiThemeProvider>
    <MyAwesomeReactComponent />
  </MuiThemeProvider>)}
;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
