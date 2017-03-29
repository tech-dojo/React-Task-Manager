import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import axios from 'axios';

var retrievUser = JSON.parse(localStorage.getItem('localStore'))

export default class AddTask extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      created_on: null,
      due_date : null
    };
    this.state.open = false;
    this.userData = {};
    this.state.disable = true;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.userData[event.target.name] = event.target.value;
      if (this.userData.task_name=="" || this.userData.task_name==undefined
        || this.userData.assigned_to == "" || this.userData.assigned_to == undefined
        || this.userData.estimated_time == "" || this.userData.estimated_time == undefined) {
          this.userData['disable'] = true;
      } else {
          this.userData['disable'] = false;
      }

      console.log(this.userData);
      this.setState(this.userData);
  }
  //
  // isConfirmedPassword(event) {
  //   return (event.target.value === this.state.password)
  // }
  handleSubmit(event) {
      console.log(this.state);
      this.userData[event.target] = null;
        axios.post('http://localhost:3080/api/task/create', {
            created_by: retrievUser.user_name,
            task_name: this.state.task_name,
            assigned_to: this.state.assigned_to,
            estimated_time: this.state.estimated_time,
        }).then(function(response) {
          console.log(response);
        }).catch(function(error) {
            console.log(error);
        })
  }

  handleOpen = () => {
    this.setState({open: true,
    });

  };

  handleClose = () => {
    this.setState({open: false});
  };



  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}/>,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        disabled={this.state.disable}
        onTouchTap={this.handleSubmit}/>,
    ];
    return(
      <span>
      <RaisedButton label="Add Task"  backgroundColor="#008080" fullWidth={true}  onTouchTap={this.handleOpen}/>
        <Dialog
          title="Enter Task Info"
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}>
          <form>
            <TextField
            name="task_name"
            hintText="Task name"
            floatingLabelText="Task Name"
            onChange={this.handleChange}/><br/>
            <SelectField floatingLabelText="Select Programmer" value={props.value} name="user_type" onChange={this.handleChangeForSelect}>
                <MenuItem value={"Manager"} primaryText="Manager"/>
                <MenuItem value={"Programmer"} primaryText="Programmer"/>
              </SelectField>
              <TextField
                name="estimated_time"
                hintText="Estimated Time"
                floatingLabelText="Estimated Time"
                onChange={this.handleChange}/><br/>
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
// backgroundColor="#008080"
