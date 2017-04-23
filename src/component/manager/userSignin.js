import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';

export default class UserSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.user_name = '';
        this.state.password = '';
        this.userData = {};
        this.state.disable=true;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.userData[event.target.name] = event.target.value;
        if (this.userData.user_name=='' || this.userData.user_name==undefined
          || this.userData.password == '' || this.userData.password == undefined) {
            this.userData['disable'] = true;
        } else {
            this.userData['disable'] = false;
        }
        this.setState(this.userData);
    }

    handleSubmit(event) {
        this.userData[event.target] = null;
          axios.post('api/user/signin', {
              user_name: this.state.user_name,
              password: this.state.password,
          }).then(function(response) {
            var localStore={'user_name':response.data.user_name, 'user_type':response.data.user_type};
            localStorage.setItem('localStore', JSON.stringify(localStore))
            if(response.data.user_type==='Manager'){
              browserHistory.push('/')
            }
            else if(response.data.user_type==='Programmer'){
              browserHistory.push('/programmerView');
            }else{
              console.log('User Name or Password Mismatch');
            }
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

  <div style={styles.div}>
    <Paper zDepth={3} style={styles.paperOne}>
      <h1  style={{fontWeight: 'bold', color: '#880E4F' , fontSize:30}}>User LogIn</h1>
        <TextField name="user_name" floatingLabelText="User Name" onChange={props.handleChange}
          underlineStyle={styles.underlineStyle}/><br/>
        <TextField type="password" name="password"
          floatingLabelText="Password"
          onChange={props.handleChange}
          underlineStyle={styles.underlineStyle}/><br/>
        <FlatButton label="SUBMIT" primary={true} disabled={props.disabled} onTouchTap={props.handleSubmit}/>
    </Paper>
    < Link to = "/createUser" >Create a new user </Link>

  </div>
)

const styles = {
    div: {
        padding: 20,
        textAlign: 'center',
        width: '96%',
        float: 'center'
    },
    errorStyle: {
        color: '#E57373'
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
        float: 'center',
        backgroundColor:'#E0F7FA',
    },
    paperRight: {
        height: 600,
        flex: 4,
        margin: 10,
        textAlign: 'center'
    }
};
