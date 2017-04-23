import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import { browserHistory } from 'react-router';

export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.user_name = '';
        this.state.password = '';
        this.state.confirm_password = '';
        this.state = {
            user_type: ''
        };
        this.userData = {};
        this.state.disable = true;
        this.state.errorText = '';
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeForSelect = this.handleChangeForSelect.bind(this);
    }

    handleChange(event) {
        this.userData[event.target.name] = event.target.value;
        if (this.userData.password !== this.userData.confirm_password) {
            this.userData['errorText'] = 'password mismatch';
        } else {
            this.userData['errorText'] = '';
        }

        if (this.userData.password !== this.userData.confirm_password
          || this.userData.user_name == '' || this.userData.user_name == undefined
          || this.userData.user_type == null
          || this.userData.password == '' || this.userData.password == undefined
          || this.userData.confirm_password == '' || this.userData.confirm_password == undefined) {
            this.userData['disable'] = true;
        } else {
            this.userData['disable'] = false;
        }
        this.setState(this.userData);
    }
    handleChangeForSelect(event, index, value) {
        this.userData['user_type'] = value;
        if (this.userData.password !== this.userData.confirm_password
          || this.userData.user_name == '' || this.userData.user_name == undefined
          || this.userData.user_type == null
          || this.userData.password == '' || this.userData.password == undefined
          || this.userData.confirm_password == '' || this.userData.confirm_password == undefined) {
            this.userData['disable'] = true;
        } else {
            this.userData['disable'] = false;
        }
        this.setState(this.userData);
    }

    handleSubmit(event) {
        this.userData[event.target] = null;
        axios.post('api/user/create', {
            user_name: this.state.user_name,
            password: this.state.password,
            user_type: this.state.user_type
        }).then(function(response) {
          browserHistory.push('/userSignin');
        }).catch(function(error) {
            console.log(error);
        })
    }

    render() {
        return (
            <div style={styles.div}>
                <CreateUserForm
                  disabled={this.state.disable}
                  errorText={this.state.errorText}
                  value={this.state.user_type}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  handleChangeForSelect={this.handleChangeForSelect}/>
            </div>
        );
    }
}

const CreateUserForm = (props) => (
  <div style={styles.div}>
    <Paper zDepth={3} style={styles.paperOne}>
      <h1  style={{fontWeight: 'bold', color: '#880E4F' , fontSize:30}}>Create Account</h1>
        <TextField name="user_name" floatingLabelText="User Name" onChange={props.handleChange} underlineStyle={styles.underlineStyle}/><br/>
        <TextField type="password" name="password" floatingLabelText="Password" onChange={props.handleChange} underlineStyle={styles.underlineStyle} errorText={props.errorText}/><br/>
        <TextField type="password" name="confirm_password" floatingLabelText="Confirm Password" errorStyle={styles.errorStyle} onChange={props.handleChange} errorText={props.errorText} underlineStyle={styles.underlineStyle}/><br/>
        <SelectField floatingLabelText="Select User Type" value={props.value} name="user_type" onChange={props.handleChangeForSelect}>
            <MenuItem value={"Manager"} primaryText="Manager"/>
            <MenuItem value={"Programmer"} primaryText="Programmer"/>
        </SelectField>
        <br/>
        <FlatButton label="SUBMIT" primary={true} disabled={props.disabled} onTouchTap={props.handleSubmit}/>
      </Paper>
    </div>
)

const styles = {
    div: {
        verticalAlign: 'middle',
        padding: 20,
        textAlign: 'center',
        width: '96%',
        border: '3px',
        float: 'center',
    },
    errorStyle: {
        color: '#E57373'
    },
    about: {
        textalign: 'center',
        padding: 20
    },
    mediaPiece: {
        maxwidth: '70%',
        margin: 'auto',
        maxheight: '70%',
    },
    marginTop: {
        margintop: 30
    },
    underlineStyle: {
        borderColor: '#FF9800'
    },
    floatingLabelStyle: {
        color: '#FF9800'
    },
    floatingLabelFocusStyle: {
        color: '#2196F3'
    },
    paperOne: {
        height: '100%',
        textAlign: 'center',
        padding: 10,
        margin: 10,
        width: '100%',
        float: 'center',
        backgroundColor:'#E0F7FA',
    }
};
