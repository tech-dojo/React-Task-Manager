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


export default class ProgrammerModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    };
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    };
    handleClose = () => {
      this.setState({open: false})
    };
    handleSignOut=() =>{
      localStorage.clear();
      console.log("cleared");
    };

    render() {
        return (
            <div>
                <AppBar title={< span style = {styles.title} > PROJECT MANAGEMENT < /span>}
                  onLeftIconButtonTouchTap={this.handleToggle}
                  iconElementRight={
                    <Link to="/userSignin">
                      < FlatButton label = "Login" />
                    </Link>}/>
                <Drawer docked={false} width={300} open={this.state.open}
                  onRequestChange={(open) => this.setState({open})}
                  className="asifDrawer">
                      <Link to="/programmerModel">
                          <MenuItem onTouchTap={this.handleClose}
                            className="menuItem">Task</MenuItem>
                      </Link>
                      <Link to="/userSignin">
                          <MenuItem onTouchTap={this.handleSignOut}
                            className="menuItem">Sign Out</MenuItem>
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
