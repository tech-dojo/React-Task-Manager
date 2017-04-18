import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import AddTask from './addTask.js'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
//import MobileTearSheet from '../../../MobileTearSheet';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {Flex, Grid} from 'reflexbox'
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import {blue600, blue500, red500, greenA200} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
//import SearchBar from 'react-search-bar'

let SelectableList = makeSelectable(List);
function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
            defaultValue: PropTypes.number.isRequired
        };

        componentWillMount() {
            this.setState({selectedIndex: this.props.defaultValue});
        }

        handleRequestChange = (event, index) => {
            this.setState({selectedIndex: index});
        };

        render() {
            return (
                <ComposedComponent value={this.state.selectedIndex} onChange={this.handleRequestChange}>
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);

export default class TaskList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            taskList: [],
            taskSelect: {},
            programmerList: []
        };

        this.handleChangeForSelect = this.handleChangeForSelect.bind(this);
        this.taskSelect = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadtaskAll = this.loadtaskAll.bind(this);
    };

    handleOpen = () => {

        this.setState({open: true});

    };

    handleSubmit(event) {
      //  console.log(this.state.taskSelect);
      //  this.state.taskSelect[event.target] = null;
        var taskSelect = {
            task_name: this.state.taskSelect.task_name,
            assigned_to: this.state.taskSelect.assigned_to,
            estimated_time: this.state.taskSelect.estimated_time

        }
        console.log(this.state.taskList);

        this.setState({open: false});
        var self = this;

        axios.put("http://localhost:3080/api/task/update/" + this.state.taskSelect.id,taskSelect).then(function(response) {
            console.log(response.data);
            self.loadtaskAll();
        }).catch(function(error) {
            console.log(error);
        });


    }

    handleClose = () => {
        this.setState({open: false});
    };
    componentWillMount() {
        var self = this
        axios.get('http://localhost:3080/api/task/all').then(function(response) {
            // this.programmerList=response;
            console.log(response.data);
            self.setState({taskList: response.data})
        }).catch(function(error) {
            console.log(error);
        })
        //console.log("find me");
        var retrievUser = JSON.parse(localStorage.getItem('localStore'));
        //console.log('retrievUser: ', retrievUser);

    }

    loadtaskAll(){
      var self = this
      axios.get('http://localhost:3080/api/task/all').then(function(response) {
          // this.programmerList=response;
          console.log(response.data);
          self.setState({taskList: response.data})
      }).catch(function(error) {
          console.log(error);
      })
      //console.log("find me");
      var retrievUser = JSON.parse(localStorage.getItem('localStore'));
    }

    handleTouchTap = (id) => {
        console.log(id);
        var self = this;

        //console.log(self);
        axios.get("http://localhost:3080/api/task/tid/" + id).then(function(response) {
            // this.programmerList=response;
            //console.log(response.data);
            self.taskSelect = response.data;
            self.taskSelect.id= id;
            self.setState({taskSelect: response.data})
        }).catch(function(error) {
            console.log(error);
        });

        axios.get('http://localhost:3080/api/programmer').then(function(response) {
            // this.programmerList=response;
            //console.log(response.data[0].user_name);
            //console.log(self.state);
            self.setState({programmerList: response.data, open: true});
            //console.log(self);
        }).catch(function(error) {
            console.log(error);
        });
    }
    handleChange(event) {
        this.state.taskSelect[event.target.name] = event.target.value;
        // if (this.userData.task_name == "" || this.userData.task_name == undefined
        // || this.userData.assigned_to == "" || this.userData.assigned_to == undefined
        // || this.userData.estimated_time == "" || this.userData.estimated_time == undefined) {
        //     this.userData['disable'] = true;
        // } else {
        //     this.userData['disable'] = false;
        // }

      //  console.log(this.userData);
        this.setState(
          {taskSelect : this.state.taskSelect}
        );
  //    console.log(this.state.taskSelect);
    }
    handleChangeForSelect(event, index, value) {
        //  console.log(value);
        //    this.userData["assigned_wto"] = value;
        // if (this.userData.task_name == "" || this.userData.task_name == undefined
        // || this.userData.assigned_to == "" || this.userData.assigned_to == undefined
        // || this.userData.estimated_time == "" || this.userData.estimated_time == undefined) {
        //     this.userData['disable'] = true;
        // } else {
        //     this.userData['disable'] = false;
        // }
        //    this.taskSelect.assigned_to = value;
        //console.log(this.state);
        // var taskObject =  {
        //   task_name : this.state.state.taskSelect.task_name,
        //   estimated_time : this.state.state.taskSelect.estimated_time,
        //   assigned_to : value
        //
        //
        // }
        //  console.log(t)
        this.state.taskSelect.assigned_to = value;
        this.setState({taskSelect : this.state.taskSelect});
    //    console.log(this.state);
        //this.setState({taskSelect : taskObject });
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
            <div>
                <div>

                </div>
                <div>
                    <SelectableList defaultValue={3}>
                        <List>
                            <AddTask loadtaskAll = {this.loadtaskAll}/>
                            {this.state.taskList.map((task) => {
                                return <ListItem key={task.task_id} leftAvatar={< Avatar icon = { < ActionAssignment />
                                }
                                backgroundColor = {
                                    blue500
                                } />} primaryText={task.task_name} secondaryText={task.assigned_to} onTouchTap={this.handleTouchTap.bind(this, task.task_id)}/>
                            })}
                        </List>
                    </SelectableList>

                </div>
                <div>
                    <Dialog title="Edit Task Info" actions={actions} modal={false} open={this.state.open} autoScrollBodyContent={true} onRequestClose={this.handleClose}>
                        <form>
                            <TextField name="task_name" hintText="Task name" floatingLabelText="Task Name" onChange={this.handleChange} defaultValue={this.state.taskSelect.task_name}/><br/>
                            <TextField name="estimated_time" hintText="Estimated Time" floatingLabelText="Estimated Time" onChange={this.handleChange} defaultValue={this.state.taskSelect.estimated_time}/><br/>
                            <SelectField floatingLabelText="Select Programmer" value={this.state.taskSelect.assigned_to} name="assigned_to" onChange={this.handleChangeForSelect}>
                                {this.state.programmerList.map((programmer) => {
                                    return <MenuItem key={programmer.user_name} value={programmer.user_name} primaryText={programmer.user_name}/>
                                })}
                            </SelectField>
                        </form>
                    </Dialog>
                </div>
            </div>
        )
    }
};
const iconStyles = {
    marginRight: 24
};
var styles = {
    title: {
        cursor: 'pointer'
    }
}
