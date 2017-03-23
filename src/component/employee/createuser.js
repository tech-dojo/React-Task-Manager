import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        axios.get('http://localhost:3000/api/user/all').then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        axios.post('http://localhost:3000/api/user/create', {
          user_Name: event.target.value,
          First_Name: req.body.First_Name,
          Last_Name: req.body.Last_Name,
          User_Type: req.body.User_Type
        }).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
    }




    render() {
        return (
            <div style={styles.div}>
                <form>
                    <TextField name="username" hintText="User Name" floatingLabelText="User Name"/><br/>
                    <TextField name="firstname" hintText="First Name" floatingLabelText="First Name"/><br/>
                    <TextField name = "lastname"  hintText="Last Name" floatingLabelText="Last Name"/><br/>
                    <TextField name = "userType" hintText="User Type" floatingLabelText="User Type"/><br/>
                    <FlatButton label="SUBMIT" primary={true} onTouchTap={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}

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
