import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import AvPlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionLaunch from 'material-ui/svg-icons/action/launch';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {Flex, Grid} from 'reflexbox'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {blue800, blue500, red500, greenA200} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import Chip from 'material-ui/Chip';
import dateFormat from 'dateformat';
//import SearchBar from 'react-search-bar'
import url from './../config/config.js';

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
        axios.get(url + "api/taskP/" + retrievUser.user_name).then(function(response) {
            // this.programmerList=response;
            console.log(response.data);
            self.setState({taskList: response.data})
        }).catch(function(error) {
            console.log(error);
        })
    }
    handleTouchTap = (id) => {
        console.log(id);
        console.log(id);
        var self = this;

        //console.log(self);
        axios.get(url + "api/task/tid/" + id).then(function(response) {
            // this.programmerList=response;
            //console.log(response.data);
            self.taskSelect = response.data;
            self.taskSelect.id = id;
            self.setState({taskSelect: response.data, open: true})
        }).catch(function(error) {
            console.log(error);
        });

    }

    handleSubmit(event) {
        //  console.log(this.state.taskSelect);
        //  this.state.taskSelect[event.target] = null;
        var taskSelect = {
            started_on: this.state.started,
            completed_on: this.state.done
        }
        //console.log(this.state.taskList);
        // var index = 0;
        // for(var i =0 ;i<this.state.taskList.length;i++){
        //   if(this.state.taskList[i].task_id==this.state.taskSelect.id){
        //     index = i;
        //   }
        // }
        // this.state.taskList[index] = this.state.taskSelect;
        //     this.setState({taskList:this.state.taskList,  open: false});
        this.setState({open: false});
        var self = this;

        console.log(taskSelect);
    }
    handleStart(task) {
        console.log(task);
        if (task.started_on == null || task.started_on == undefined || task.started_on == "") {
            var taskSelect = {
                started_on: new Date()
            }
        } else {
            console.log("entered ekse");
            var taskSelect = {
                completed_on: new Date()
            }
        }

        var self = this;
        axios.put(url + "api/task/update/" + task.task_id, taskSelect).then(function(response) {
            console.log(response.data);
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
        axios.get(url + "api/taskP/" + retrievUser.user_name).then(function(response) {
            // this.programmerList=response;
            console.log(response.data);
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
                                          leftAvatar={< Avatar icon = { < ActionAssignment />  }  backgroundColor = {blue500}/>}
                                          rightIcon={<RaisedButton disabled ={task.completed_on == undefined || null || ""
                                              ? false
                                              : true} label={task.started_on == undefined || null || ""
                                              ? "start"
                                              : "finish"} backgroundColor="#26a69a" onTouchTap={this.handleStart.bind(this, task)}/>}
                                           >
                                           <label style={{fontWeight: 'bold', color: '#006064' , fontSize:25}}>{task.task_name}</label>
                                           <div style={styles.wrapper}>
                                              <Chip backgroundColor="#00bcd4"  style={styles.chip}>Alloted Time : {task.estimated_time} hours
                                              </Chip>
                                              <Chip backgroundColor="#26a69a"  style={styles.chip}>Started : {task.started_on != null
                                                ? dateFormat(new Date(task.started_on), "dddd, mmmm dS, yyyy, h:MM:ss TT")
                                                : "Not Started"}
                                              </Chip>
                                              <Chip backgroundColor="#f48fb1"  style={styles.chip}>Completed : {task.completed_on != null
                                                ? dateFormat(new Date(task.completed_on), "dddd, mmmm dS, yyyy, h:MM:ss TT")
                                                : "Not Finished"}
                                              </Chip>
                                              <Chip backgroundColor="#a5d6a7"  style={styles.chip}>Completed In : {task.completed_on != null?(Math.abs(new Date(task.completed_on) - new Date(task.started_on)) / 36e5).toFixed(3)+" hours":"Not Started"}
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
    //marginRight: 24,
    //verticalAlign: "middle",
    //horizontalAlign: "middle",
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
    }
}
