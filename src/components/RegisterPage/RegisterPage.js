import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button, TextField, InputLabel, MenuItem, Select, FormControl} from '@material-ui/core';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    is_coach: false,
    email: ''
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          is_coach: this.state.is_coach,
          email: this.state.email
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form>
          <center>
            <h1>New User</h1>
            <i>Are you a coach?</i>
            {'\u00A0'} {'\u00A0'} 
            <FormControl>
              <InputLabel>user type</InputLabel>
              <Select
                  value = {this.state.is_coach}
                  onChange={this.handleInputChangeFor('is_coach')}
                  width = '100px'
                  inputProps={{
                      name: 'is_coach'  
                  }}>
                      <MenuItem value = {true}>Coach</MenuItem>
                      <MenuItem value = {false}>Skater</MenuItem>
                  </Select>
                  {/* <Button color = "primary" onClick = {this.handleAdd}>Add category</Button> */}
              </FormControl>
           <TextField
              name= 'username'
              label = 'username'
              value = {this.state.username}
              onChange = {this.handleInputChangeFor('username')}/>

            <TextField
              name= 'password'
              label = 'password'
              type="password"git
              value = {this.state.password}
              onChange = {this.handleInputChangeFor('password')}/>
            <TextField
              name= 'email'
              label = 'email'
              value = {this.state.email}
              onChange = {this.handleInputChangeFor('email')}/>
              <br/>
              <br/>
              <Button
                color = 'primary'
                variant = 'contained'
                onClick = {this.registerUser}>
                Register
              </Button>
              {'\u00A0'} {'\u00A0'} 
              <Button
                color = 'primary'
                variant = 'outlined'
                onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}} >
                log in
              </Button>
           </center>
        </form>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

