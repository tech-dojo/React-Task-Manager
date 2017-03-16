import React, {Component, PropTypes} from 'react';
import { Link  } from 'react-router';
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
import AddEmployee from './addEmployee.js';
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
  var peopleList = [
      {
          id: 1,
          name: "Steve Brown",
          post: "Junior Programmer",
          started: "Jan 7"
      },
      {
          id: 2,
          name: "Stephine Bell",
          post: "Database Engineer",
          started: "Jan 7"
      },
      {
          id: 3,
          name: "Anne Glory",
          post: "Programmer",
          started: "Jan 7"
      },
      {
          id: 4,
          name: "Sam Brown",
          post: "IOS Programmer",
          started: "Jan 7"
      }
  ];

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
            <AddEmployee />
          </Grid>
        </div>
        <div>
          <SelectableList defaultValue={3}>
            <Subheader inset={true}>Employee List</Subheader>
              <listRender />
              </SelectableList>
            </div>
      </div>

    )
  }
};

class listRender extends React.Component{
  render(){
    var listItems = this.state.peopleList.map((n) =>
        <ListItem key={n.id}
                value={n.name} />
    );
    return (
      <List>
        {listItems}
      </List>
    )
  }
};


var styles={
  search: {
    margin: "100px 10px 0px 10px",
  }
}
//
// value={this.state.searchString}
// onChange={this._handleSearch.bind(this)}
