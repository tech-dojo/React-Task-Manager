import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {orange500, red300, blue500} from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class UserSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        //  this.state.userData = {}
        this.state.user_name = "";
        this.state.password = "";
        //  this.state.user_type = "";;
        this.userData = {};

        this.state.disable=true;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.userData[event.target.name] = event.target.value;


        if (this.userData.user_name=="" || this.userData.user_name==undefined
          || this.userData.password == "" || this.userData.password == undefined) {
            this.userData['disable'] = true;
        } else {
            this.userData['disable'] = false;
        }

        console.log(this.userData);
        this.setState(this.userData);
    }

    //
    // isConfirmedPassword(event) {
    //   return (event.target.value === this.state.password)
    // }
    handleSubmit(event) {
        console.log(this.state);
        this.userData[event.target] = null;
          axios.post('http://localhost:3080/api/user/signin', {
              user_name: this.state.user_name,
              password: this.state.password,
          }).then(function(response) {
            console.log(response);
            if(response.data.user_type==="Manager"){
              browserHistory.push('/')
            }
            else if(response.data.user_type==="Programmer"){
              browserHistory.push('/programmerModel')
            }else{
              console.log("User Name or Password Mismatch");
            }
            var localStore={'user_name':response.data.user_name, 'user_type':response.data.user_type};
            localStorage.setItem('localStore', JSON.stringify(localStore))

            //console.log(response.data.user_name);

          }).catch(function(error) {
              console.log(error);
          })
    }

    render() {
        return (
            <div style={styles.div}>
                <CreateUserForm disabled={this.state.disable}
                value={this.state.user_type}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}/>
            </div>
        );
    }
}

const CreateUserForm = (props) => (
    <div>
        <TextField name="user_name" floatingLabelText="User Name" onChange={props.handleChange}
          underlineStyle={styles.underlineStyle}/><br/>
        <TextField type="password" name="password"
          floatingLabelText="Password"
          onChange={props.handleChange}
          underlineStyle={styles.underlineStyle}/><br/>
        <FlatButton label="SUBMIT" primary={true} disabled={props.disabled} onTouchTap={props.handleSubmit}/>
    </div>
)

const styles = {
    div: {
        verticalAlign: 'middle',
        display: 'flex',
        flexDirection: 'row wrap',
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        width: '60%',
        border: '3px'
    },
    errorStyle: {
        color: red300
    },
    underlineStyle: {
        borderColor: orange500
    },
    floatingLabelStyle: {
        color: orange500
    },
    floatingLabelFocusStyle: {
        color: blue500
    },
    paperLeft: {
        flex: 1,
        height: '100%',

        textAlign: 'center',
        padding: 10
    },
    paperRight: {
        height: 600,
        flex: 4,
        margin: 10,
        textAlign: 'center'
    }
};
