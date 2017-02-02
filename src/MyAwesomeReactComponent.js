import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

const MyAwesomeReactComponent = () => (
  <div>
    <AppBar
      title="Title"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      iconElementRight={<FlatButton label="Save" />}
    />
    <div><ManagerView/></div>
  </div>
);

function ManagerTable(){
  return <div  className="ManagerTable" />;
}
function WorkSheet(){
  return <div  className="WorkSheet" />;
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function ManagerView() {
  return (
    <SplitPane
      left={
        <ManagerTable />
      }
      right={
        <WorkSheet />
      } />
  );
}

export default MyAwesomeReactComponent;
