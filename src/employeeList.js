import React, {Component, PropTypes} from 'react';
import { Link  } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import Subheader from 'material-ui/Subheader';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionDone from 'material-ui/svg-icons/action/done';
import Avatar from 'material-ui/Avatar';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import { Flex, Grid } from 'reflexbox'
import {blue600, blue500, red500, greenA200} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

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
export default class EmployeeList extends React.Component {
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
        onTouchTap={this.handleClose}
        />,
    ];
    return(
      <div>
        <div>
          <Grid col={6} px={2}>
            <input type="text"/>
            <IconButton>
              <ActionSearch color={blue600}/>
            </IconButton>
          </Grid>
          <Grid col={6} px={2}>
            <RaisedButton label="Add Employee" backgroundColor="#F48FB1" fullWidth={true} onTouchTap={this.handleOpen}/>
              <Dialog
                title="Enter Employee Details"
                actions={actions}
                modal={false}
                open={this.state.open}
                autoScrollBodyContent={true}
                onRequestClose={this.handleClose}>
                <TextField
                  hintText="Full Name"
                  /><br/>
                  <TextField
                    hintText="Position"
                    /><br/>
                    <TextField
                      hintText="Comment"
                      />
              </Dialog>
          </Grid>
        </div>
        <div>
          <SelectableList defaultValue={3}>
          <List>
            <Subheader inset={true}>Employee List</Subheader>
            <ListItem value={1}
              leftAvatar={<Avatar icon={<SocialPerson />} backgroundColor={blue500} />}
              rightIcon={<ActionSchedule />}
              primaryText="Steve Brown"
              secondaryText="Junior Programmer"
              />
          </List>
            <List>
              <ListItem value={2}
                leftAvatar={<Avatar icon={<SocialPerson />} backgroundColor={blue500} />}
                rightIcon={<ActionDone color={greenA200}/>}
                primaryText="Stephine Bell"
                secondaryText="Database Engineer"
                />
            </List>
              <List>
                <ListItem value={3}
                  leftAvatar={<Avatar icon={<SocialPerson />} backgroundColor={blue500} />}
                  rightIcon={<ActionSchedule />}
                  primaryText="Anne Glory"
                  secondaryText="Programmer"
                  />
              </List>
                <List>
                  <ListItem value={4}
                    leftAvatar={<Avatar icon={<SocialPerson />} backgroundColor={blue500} />}
                    rightIcon={<ActionDone color={greenA200}/>}
                    primaryText="Sam Brown"
                    secondaryText="IOS Programmer"
                    />
                  </List>
              </SelectableList>
            </div>
      </div>

    )
  }
};
