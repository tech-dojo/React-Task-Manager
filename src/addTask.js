import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

export default class AddTask extends React.Component{
  constructor(props){
  super(props);
  this.state = {};
  this.state.open = false;
  }



  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
        />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
        />,
    ];
    return(
      <span>
      <RaisedButton label="Add Task" backgroundColor="#F48FB1" fullWidth={true} onTouchTap={this.handleOpen}/>
        <Dialog
          title="Enter Task Info"
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}>
          <form>
            <TextField
            hintText="Task name"
            floatingLabelText="Task Name"
            /><br/>
            <TextField
              hintText="Assigned to"
              floatingLabelText="Assigned to"
              /><br/>
            <DatePicker
            hintText="Pick A Date"
            floatingLabelText="Due Date" />
          </form>
        </Dialog>
      </span>
    )
  }
}

var styles={
  dialog: {
    width: '70%',
    maxWidth: 'none',
    height:'60%',
    maxHeight:'none',
  }
}
