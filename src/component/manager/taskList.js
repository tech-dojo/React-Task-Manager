import React, {Component, PropTypes} from 'react';
import AddTask from './addTask.js'
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {Flex, Grid} from 'reflexbox'
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import dateFormat from 'dateformat';

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
        var taskSelect = {
            task_name: this.state.taskSelect.task_name,
            assigned_to: this.state.taskSelect.assigned_to,
            estimated_time: this.state.taskSelect.estimated_time
        }

        this.setState({open: false});
        var self = this;

        axios.put('api/task/update/' + this.state.taskSelect.id, taskSelect).then(function(response) {
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
        axios.get('api/task/all').then(function(response) {
            self.setState({taskList: response.data})
        }).catch(function(error) {
            console.log(error);
        })
        var retrievUser = JSON.parse(localStorage.getItem('localStore'));
    }

    loadtaskAll() {
        var self = this
        axios.get('api/task/all').then(function(response) {
            self.setState({taskList: response.data})
        }).catch(function(error) {
            console.log(error);
        })
        var retrievUser = JSON.parse(localStorage.getItem('localStore'));
    }

    handleTouchTap = (id) => {
        var self = this;

        axios.get('api/task/tid/' + id).then(function(response) {
            self.taskSelect = response.data;
            self.taskSelect.id = id;
            self.setState({taskSelect: response.data})
        }).catch(function(error) {
            console.log(error);
        });

        axios.get('api/programmer').then(function(response) {
            self.setState({programmerList: response.data, open: true});
        }).catch(function(error) {
            console.log(error);
        });
    }
    handleChange(event) {
        this.state.taskSelect[event.target.name] = event.target.value;
        this.setState({taskSelect: this.state.taskSelect});
    }
    handleChangeForSelect(event, index, value) {
        this.state.taskSelect.assigned_to = value;
        this.setState({taskSelect: this.state.taskSelect});
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
                <div></div>
                <div>
                    <SelectableList defaultValue={3}>
                        <List>
                            <AddTask loadtaskAll={this.loadtaskAll}/> {this.state.taskList.map((task) => {
                                return <ListItem key={task.task_id} leftAvatar={< Avatar icon = { < ActionAssignment />
                                }
                                backgroundColor = {
                                    "#2196F3"
                                } />} onTouchTap={this.handleTouchTap.bind(this, task.task_id)}>

                                    <label style={{
                                        fontWeight: 'bold',
                                        color: '#006064',
                                        fontSize: 25
                                    }}>{task.task_name}</label>
                                    <div style={styles.wrapper}>
                                        <Chip backgroundColor="#00bcd4" style={styles.chip}>Assigned To : {task.assigned_to}
                                        </Chip>
                                        {task.started_on != null
                                            ? (task.completed_on != null
                                                ? <Chip backgroundColor="#4CAF50" style={styles.chip}>Completed On : {dateFormat(new Date(task.completed_on), 'dddd, mmmm dS, yyyy, h:MM:ss TT ')}
                                                        ; Completed In : {(Math.abs(new Date(task.completed_on) - new Date(task.started_on)) / 36e5).toFixed(3)}
                                                        hours</Chip>
                                                : <Chip backgroundColor="#F9A825" style={styles.chip}>Started On : {dateFormat(new Date(task.started_on), 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</Chip>)
                                            : <Chip backgroundColor="#FF7043" style={styles.chip}>Not Started</Chip>}

                                    </div>
                                </ListItem>
                            })}
                        </List>
                    </SelectableList>

                </div>
                <div>
                    <Dialog title="Edit Task Info" actions={actions} modal={false} open={this.state.open} autoScrollBodyContent={true} onRequestClose={this.handleClose}>
                        <form>
                            <TextField name="task_name" hintText="Task name" floatingLabelText="Task Name" onChange={this.handleChange} defaultValue={this.state.taskSelect.task_name}/><br/>
                            <TextField type="number" name="estimated_time" hintText="Estimated Time" floatingLabelText="Estimated Time" onChange={this.handleChange} defaultValue={this.state.taskSelect.estimated_time}/><br/>
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
    },
    chip: {
        margin: 4,
        float: 'left'
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}
