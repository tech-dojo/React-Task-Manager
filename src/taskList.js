import React from 'react';
import { Link  } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';



export default class TaskList extends React.Component {
  render(){
    return(
      <div>
        <div class="row">
          <div class="col-sm-8">
            <form>
                  <input type="text" class="search-query" placeholder="Search Task.."/>
                  <IconButton iconClassName="muidocs-icon-custom-search" />
            </form>
          </div>
          <div class="col-sm-4">
            <RaisedButton label="Add Task" backgroundColor="#0097A7"/>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Task</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Assigned To</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>Fitness App: UI</TableRowColumn>
              <TableRowColumn>Not Started</TableRowColumn>
              <TableHeaderColumn>Steve Brown</TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Fitness App: Database</TableRowColumn>
              <TableRowColumn>Started</TableRowColumn>
              <TableHeaderColumn>Stephine Bell</TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Alarm App: UI</TableRowColumn>
              <TableRowColumn>Started</TableRowColumn>
              <TableHeaderColumn>Anne Glory</TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Alarm App: IOS</TableRowColumn>
              <TableRowColumn>Not Started</TableRowColumn>
              <TableHeaderColumn>Sam Brown</TableHeaderColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
};

var styles={
  title: {
  cursor: 'pointer',
  }
}
