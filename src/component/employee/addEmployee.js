import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class AddEmployee extends React.Component{
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
        <RaisedButton label="Add Employee" backgroundColor="#F48FB1" fullWidth={true} onTouchTap={this.handleOpen}/>
        <Dialog
          title="Enter Employee Details"
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}>
          <TextField
            hintText="Full Name"
            /><br/>
            <TextField
              hintText="Position"
              /><br/>
              <TextField
                hintText="Comment"
                />
        </Dialog>
      </span>
    )
  }
}
