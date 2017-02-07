import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import { Link } from 'react-router';


export default class Model extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    };
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    };

    render() {
        return (
            <div>
                <AppBar title={< span style = {styles.title} > PROJECT MANAGEMENT < /span>}
                  onLeftIconButtonTouchTap={this.handleToggle}
                  iconElementRight={< FlatButton label = "Login/ Register" />}/>
                <Drawer docked={false} width={300} open={this.state.open}
                  onRequestChange={(open) => this.setState({open})} >
                      <Link to="/employeeList">
                        <MenuItem
                          className="menuItem">Employee</MenuItem>
                      </Link>
                      <Divider/>
                      <Link to="/taskList">
                          <MenuItem
                            className="menuItem">Task</MenuItem>
                      </Link>
                </Drawer>
                { this.props.children }
            </div>
        );
    }
};



var styles={
  title: {
  cursor: 'pointer',
  }
}
