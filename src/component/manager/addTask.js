import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
            programmerSelected:'',
            task_name: '',
            estimated_time: ''

          }
        };
        this.task = {};
        this.userData = {};
        this.userData.programmerList = [];
        this.state.disable = true;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeForSelect = this.handleChangeForSelect.bind(this);
    }

    handleChange(event) {
        this.task[event.target.name] = event.target.value;
        this.setState({
          task : this.task
        });
    }
    handleSubmit(event) {
        this.userData[event.target] = null;
        var userData = {
          created_by: this.retrievUser.user_name,
          task_name: this.state.task.task_name,
          assigned_to: this.state.task.programmerSelected,
          estimated_time: this.state.task.estimated_time
        }
        var self = this;
        axios.post('api/task/create',userData).then(function(response) {
            self.props.loadtaskAll();
           self.setState({open: false});
        }).catch(function(error) {
            console.log(error);
        })
    }


    handleOpen = () => {
    var self = this;
        axios.get('api/programmer').then(function(response) {
            self.setState({programmerList:response.data, open:true});
        }).catch(function(error) {
            console.log(error);
        })

    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChangeForSelect(event, index, value) {
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
                        <TextField type="number" name="estimated_time" hintText="Estimated Time" floatingLabelText="Estimated Time" onChange={this.handleChange}/><br/>
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
