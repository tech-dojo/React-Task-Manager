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

export default class TaskList extends React.Component {
  state = {
  open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

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
            <ListItem value={1}
              leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
              rightIcon={<ActionSchedule />}
              primaryText="Fitness App: UI"
              secondaryText="Assigned To: Steve Brown"
              />
          </List>
            <List>
              <ListItem value={2}
                leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                rightIcon={<ActionDone color={greenA200}/>}
                primaryText="Fitness App: Database"
                secondaryText="Assigned To: Stephine Bell"
                />
            </List>
              <List>
                <ListItem  value={3}
                  leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                  rightIcon={<ActionSchedule />}
                  primaryText="Alarm App: UI"
                  secondaryText="Assigned To: Anne Glory"
                  />
              </List>
                <List>
                  <ListItem  value={4}
                    leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                    rightIcon={<ActionDone color={greenA200}/>}
                    primaryText="Alarm App: IOS"
                    secondaryText="Assigned To: Sam Brown"
                    />
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
