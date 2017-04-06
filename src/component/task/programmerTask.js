import React, {Component, PropTypes} from 'react';
import { Link  } from 'react-router';
import AddTask from './addTask.js'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
//import MobileTearSheet from '../../../MobileTearSheet';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import AvPlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionLaunch from 'material-ui/svg-icons/action/launch';
import MdDone from 'react-icons/lib/md';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import { Flex, Grid } from 'reflexbox'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {blue600, blue500, red500, greenA200} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

//import SearchBar from 'react-search-bar'


let SelectableList = makeSelectable(List);
function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);


export default class ProgrammerTask extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      taskList : [],
      started : null,
      done : null,
      taskSelect:{},
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleDone = this.handleDone.bind(this);
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
    axios.get("http://localhost:3080/api/taskP/"+ retrievUser.user_name).then(function(response) {
      // this.programmerList=response;
      console.log(response.data);
      self.setState({taskList : response.data})
    }).catch(function(error) {
        console.log(error);
    })
  }
  handleTouchTap = (id) =>{
    console.log(id);
    console.log(id);
    var self = this;

    //console.log(self);
    axios.get("http://localhost:3080/api/task/tid/" + id).then(function(response) {
        // this.programmerList=response;
        //console.log(response.data);
        self.taskSelect = response.data;
        self.taskSelect.id= id;
        self.setState({taskSelect: response.data,open:true})
    }).catch(function(error) {
        console.log(error);
    });


  }

  handleDone =()=>{
    this.setState({done : new Date()});

  }


  handleStart =()=>{
    this.setState({started : new Date()});
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

      axios.put("http://localhost:3080/api/task/update/" + this.state.taskSelect.id, taskSelect).then(function(response) {
          console.log(response.data);
          self.loadtaskAll();
      }).catch(function(error) {
          console.log(error);
      });
      console.log(taskSelect);
  }

  loadtaskAll(){
    var retrievUser = JSON.parse(localStorage.getItem('localStore'));
    var self = this
    axios.get("http://localhost:3080/api/taskP/"+ retrievUser.user_name).then(function(response) {
      // this.programmerList=response;
      console.log(response.data);
      self.setState({taskList : response.data})
    }).catch(function(error) {
        console.log(error);
    })

  }

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
        onTouchTap={this.handleSubmit}
        />,
];
    return(
      <div>
        <div>
          <SelectableList  defaultValue={3}>
          <List>
            <h1>MY TASKS</h1>
              {this.state.taskList.map((task)=>{
                  return   <ListItem key = {task.task_id}
                      leftAvatar={<Avatar icon={<ActionAssignment />}
                      backgroundColor={blue500} />}
                      primaryText={task.task_name}
                      secondaryText={task.estimated_time}
                      onTouchTap={this.handleTouchTap.bind(this, task.task_id)}
                      />
              })}
                  </List>
              </SelectableList>
            </div>
            <div>
              <Dialog
                title="Task Interaction"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                contentStyle={styles.DrawerStyle}
                >
                <FloatingActionButton   onClick={this.handleStart}>
                  <AvPlayCircleOutline/>
                </FloatingActionButton><h4>Started ON {this.state.taskSelect.started_on}</h4>
              <br/>
              <br/>
                <FloatingActionButton onClick={this.handleDone}>
                  <ActionDone/>
                </FloatingActionButton><h4>Completed ON {this.state.taskSelect.completed_on}</h4>
              </Dialog>
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

var styles={
  title: {
  cursor: 'pointer',
},
  DrawerStyle : {
    width: '20%',
    maxWidth: 'none',
  }
}
