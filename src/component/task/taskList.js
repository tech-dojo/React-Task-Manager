import React, {Component, PropTypes} from 'react';
import { Link  } from 'react-router';
import AddTask from './addTask.js'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
//import MobileTearSheet from '../../../MobileTearSheet';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import { Flex, Grid } from 'reflexbox'
import {blue600, blue500, red500, greenA200} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
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
    handleTap = () =>{

    }

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


export default class TaskList extends React.Component {
  state = {
  open: false,
  taskList : []
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  componentWillMount() {
    var self = this
    axios.get('http://localhost:3080/api/task/all').then(function(response) {
      // this.programmerList=response;
      console.log(response.data);
      self.setState({taskList : response.data})
    }).catch(function(error) {
        console.log(error);
    })
  }



  render(){
    return(
      <div>
        <div>
          <Grid col={6} px={2}>
              <TextField
                hintText={
                  <span>
                    <ActionSearch style={styles.search}  color="rgb(158, 158, 158)"/>
                    Search Employee
                  </span>
                }
                hintStyle={{color: 'rgba(0, 0, 0, 0.41)'}}/>
          </Grid>
          <Grid col={6} px={2}>
            <AddTask/>
          </Grid>
        </div>
        <div>
          <SelectableList  defaultValue={3}>
          <List>
            <Subheader inset={true}>Task List</Subheader>
              {this.state.taskList.map((task)=>{
                  return   <ListItem key = {task.task_id}
                      leftAvatar={<Avatar icon={<ActionAssignment />}
                      rightIcon={<ActionDone color={greenA200}/>}
                      backgroundColor={blue500} />}
                      primaryText={task.task_name}
                      secondaryText={task.assigned_to}
                      />
              })}
                  </List>
              </SelectableList>
            </div>
      </div>
    )
  }
};
const iconStyles = {
  marginRight: 24,
};
var styles={
  title: {
  cursor: 'pointer',
  }
}
