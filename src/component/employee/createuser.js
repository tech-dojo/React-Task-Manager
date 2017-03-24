import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      //  this.state.userData = {}
        this.state.user_name = "";
        this.state.first_name = "";
        this.state.last_name = "";
        this.state.user_type = "";




        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
      //console.log(event.target.name);
      var userData = {};
      userData[event.target.name]=event.target.value;
      console.log(userData);
        this.setState(userData);
    }

    handleSubmit(event) {
      console.log(this.state);
        axios.post('http://localhost:3000/api/user/create', {
          user_name: this.state.user_name,
          first_name:this.state.first_name,
          last_name: this.state.last_name,
          user_type: this.state.user_type
        }).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
    }




    render() {
        return (
            <div style={styles.div}>
              <CreateUserForm handleChange={this.handleChange} handleSubmit = {this.handleSubmit}/>
            </div>
        );
    }
}

const CreateUserForm = (props)=>(
  <div>
    <TextField name="user_name" hintText="User Name" floatingLabelText="User Name" onChange={props.handleChange}/><br/>
    <TextField name="first_name" hintText="First Name" floatingLabelText="First Name" onChange={props.handleChange}/><br/>
    <TextField name = "last_name"  hintText="Last Name" floatingLabelText="Last Name" onChange={props.handleChange}/><br/>
    <TextField name = "user_type" hintText="User Type" floatingLabelText="User Type"onChange={props.handleChange}/><br/>
    <FlatButton label="SUBMIT" primary={true} onTouchTap = {props.handleSubmit}/>
  </div>
)

const styles = {
    div: {
        display: 'flex',
        flexDirection: 'row wrap',
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        width: '60%',
        border: '3px'
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
