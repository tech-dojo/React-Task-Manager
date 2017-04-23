import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {Flex} from 'reflexbox'
import axios from 'axios';
import Chip from 'material-ui/Chip';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
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

export default class ProgrammerTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            taskList: [],
            taskSelect: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    componentWillMount() {
        var retrievUser = JSON.parse(localStorage.getItem('localStore'));
        var self = this
        axios.get('api/taskP/' + retrievUser.user_name).then(function(response) {
            self.setState({taskList: response.data})
        }).catch(function(error) {
            console.log(error);
        })
    }
    handleTouchTap = (id) => {
        var self = this;

        axios.get('api/task/tid/' + id).then(function(response) {
            self.taskSelect = response.data;
            self.taskSelect.id = id;
            self.setState({taskSelect: response.data, open: true})
        }).catch(function(error) {
            console.log(error);
        });

    }

    handleSubmit(event) {
        var taskSelect = {
            started_on: this.state.started,
            completed_on: this.state.done
        }
        this.setState({open: false});
        var self = this;
    }
    handleStart(task) {
        if (task.started_on == null || task.started_on == undefined || task.started_on == '') {
            var taskSelect = {
                started_on: new Date()
            }
        } else {
            var taskSelect = {
                completed_on: new Date()
            }
        }

        var self = this;
        axios.put('api/task/update/' + task.task_id, taskSelect).then(function(response) {
            self.setState({taskSelect: taskSelect});
            self.loadtaskAll();
        }).catch(function(error) {
            console.log(error);
        });

    }
    handleFinish(id) {
        this.setState({done: new Date()});
    }

    loadtaskAll() {
        var retrievUser = JSON.parse(localStorage.getItem('localStore'));
        var self = this
        axios.get('api/taskP/' + retrievUser.user_name).then(function(response) {
            self.setState({taskList: response.data})
        }).catch(function(error) {
            console.log(error);
        })
    }

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
                    <SelectableList defaultValue={3}>
                        <List>
                            <h1>
                                TASKS
                            </h1>
                            {this.state.taskList.map((task) => {
                                return <ListItem key={task.task_id}
                                          leftAvatar={< Avatar icon = { < ActionAssignment />  }  backgroundColor = {"#2196F3"}/>}
                                          rightIcon={<RaisedButton style={{margin: 38,float : 'left'}} disabled ={task.completed_on == undefined || null || ''
                                              ? false
                                              : true} label={task.started_on == undefined || null || ''
                                              ? 'start'
                                              : 'finish'} backgroundColor="#26a69a" onTouchTap={this.handleStart.bind(this, task)}/>}
                                           >
                                           <label style={{fontWeight: 'bold', color: '#006064' , fontSize:25}}>{task.task_name}</label>
                                           <div style={styles.wrapper}>
                                              <Chip backgroundColor="#00bcd4"  style={styles.chip}>Alloted Time : {task.estimated_time} hours
                                              </Chip>
                                              <Chip backgroundColor="#26a69a"  style={styles.chip}>Started : {task.started_on != null
                                                ? dateFormat(new Date(task.started_on), 'dddd, mmmm dS, yyyy, h:MM:ss TT')
                                                : 'Not Started'}
                                              </Chip>
                                              <Chip backgroundColor="#f48fb1"  style={styles.chip}>Completed : {task.completed_on != null
                                                ? dateFormat(new Date(task.completed_on), 'dddd, mmmm dS, yyyy, h:MM:ss TT')
                                                : 'Not Finished'}
                                              </Chip>
                                              <Chip backgroundColor="#a5d6a7"  style={styles.chip}>Completed In : {task.completed_on != null?(Math.abs(new Date(task.completed_on) - new Date(task.started_on)) / 36e5).toFixed(3)+' hours':'Not Started'}
                                              </Chip>
                                          </div>
                                </ListItem>
                            })}
                        </List>
                    </SelectableList>
                </div>
                <div>
                </div>
            </div>
        )
    }
};
const iconStyles = {
    size: 300
};

var styles = {
    title: {
        cursor: 'pointer'
    },
    DrawerStyle: {
        width: '20%',
        maxWidth: 'none'
    },
    chip: {
        margin: 4,
        float : 'left'
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    },
}
