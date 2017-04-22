import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import axios from 'axios';

export default class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.retrievUser = JSON.parse(localStorage.getItem('localStore'));

        this.state = {
          programmerList  :[],
          userData : {},
          open:false,
          task : {
            programmerSelected:"",
            task_name: "",
            estimated_time: ""

          }
        };
        this.task = {};
        console.log(this.state);
      //  this.state.open = false;
        this.userData = {};
        this.userData.programmerList = [];
        this.state.disable = true;
      //  this.state.programmerList = [];
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeForSelect = this.handleChangeForSelect.bind(this);
    }

    handleChange(event) {
        this.task[event.target.name] = event.target.value;
        // if (this.userData.task_name == "" || this.userData.task_name == undefined
        // || this.userData.assigned_to == "" || this.userData.assigned_to == undefined
        // || this.userData.estimated_time == "" || this.userData.estimated_time == undefined) {
        //     this.userData['disable'] = true;
        // } else {
        //     this.userData['disable'] = false;
        // }

      //  console.log(this.userData);
        this.setState({
          task : this.task
        });
    }
    //
    // isConfirmedPassword(event) {
    //   return (event.target.value === this.state.password)
    // }
    handleSubmit(event) {
        console.log(this.state);
        this.userData[event.target] = null;
        var userData = {
          created_by: this.retrievUser.user_name,
          task_name: this.state.task.task_name,
          assigned_to: this.state.task.programmerSelected,
          estimated_time: this.state.task.estimated_time

        }
        var self = this;
        console.log(userData);
        axios.post('api/task/create',userData).then(function(response) {
            console.log(response.data);
            self.props.loadtaskAll();
           self.setState({open: false});

        }).catch(function(error) {
            console.log(error);
        })
    }


    handleOpen = () => {
    //  console.log(this.state);
    var self = this;
        axios.get('api/programmer').then(function(response) {
            // this.programmerList=response;
            console.log(response.data[0].user_name);
            //console.log(self.state);
            self.setState({programmerList:response.data, open:true});
        }).catch(function(error) {
            console.log(error);
        })

    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChangeForSelect(event, index, value) {
      console.log(value);
    //    this.userData["assigned_to"] = value;
        // if (this.userData.task_name == "" || this.userData.task_name == undefined
        // || this.userData.assigned_to == "" || this.userData.assigned_to == undefined
        // || this.userData.estimated_time == "" || this.userData.estimated_time == undefined) {
        //     this.userData['disable'] = true;
        // } else {
        //     this.userData['disable'] = false;
        // }
        this.task.programmerSelected = value;

        this.setState({task : this.task});
    };

    render() {
        const actions = [ < FlatButton label = "Cancel" primary = {
                true
            }
            onTouchTap = {
                this.handleClose
            } />, < FlatButton label = "Submit" primary = {
                true
            }
            keyboardFocused = {
                true
            }

            onTouchTap = {
                this.handleSubmit
            } />
        ];
        return (
            <span>
                <RaisedButton label="Add Task"  backgroundColor="#a4c639" fullWidth={true} onTouchTap={this.handleOpen}/>
                <Dialog title="Enter Task Info" actions={actions} modal={false} open={this.state.open} autoScrollBodyContent={true} onRequestClose={this.handleClose}>
                    <form>
                        <TextField name="task_name" hintText="Task name" floatingLabelText="Task Name" onChange={this.handleChange}/><br/>
                        <TextField name="estimated_time" hintText="Estimated Time" floatingLabelText="Estimated Time" onChange={this.handleChange}/><br/>
                        <SelectField floatingLabelText="Select Programmer" value={this.state.task.programmerSelected} name="assigned_to" onChange={this.handleChangeForSelect}>

                              {this.state.programmerList.map((programmer)=>{
                                  return <MenuItem  key = {programmer.user_name} value={programmer.user_name} primaryText = {programmer.user_name}/>
                              })}
                        </SelectField>
                    </form>
                </Dialog>
            </span>
        )
    }
}

var styles = {
    dialog: {
        width: '70%',
        maxWidth: 'none',
        height: '60%',
        maxHeight: 'none'
    }
}
// backgroundColor="#008080"
