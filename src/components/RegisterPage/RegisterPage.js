import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button, TextField, InputLabel, MenuItem, Select, FormControl, Grid, Paper} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
      flexGrow: 1,
      alignItems: 'center',
      justify: 'center',
      backgroundImage: 'url(https://www.mnrollerderby.com/wp-content/uploads/2019/08/MinnesotaRollerDerby_AboutUs_11-1024x683.jpg)',
      height: "680px"
      
  },
  paper: {
      width: '100%',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      justify: 'center',
      margin: '0px',
      borderRadius: '5px'
  },
  textFeld:{
      width: 300,
  },
  longField:{
      width: '85%',
  },
  login:{
    fontFamily: 'Sans-serif',
    fontSize: '60px',
    width: '100%',
    padding: theme.spacing(1),
    margin:0
  },
  formControl:{
    width: '100px'
  }

});

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
    const {classes} = this.props;
    return (
      <div className = {classes.root}>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <Grid container
          justify="center"
          alignItems="center"
          direction = "column">
          <Grid item xs = {12} sm = {8} md = {6} lg = {4} xl = {3}>
            <Paper className = {classes.paper}>
              <form>
                <h1 className = {classes.login}>NEW USER</h1>
                <Grid container
                direction= "row"
                alignItems=  "baseline"
                justify = "center">
                <i>Are you a coach?</i>
                {'\u00A0'} {'\u00A0'} {'\u00A0'} {'\u00A0'}
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
                  </FormControl>
              </Grid>
              {/* <br/> */}
              <TextField
                  name= 'username'
                  label = 'username'
                  value = {this.state.username}
                  onChange = {this.handleInputChangeFor('username')}/>
                {'\u00A0'} {'\u00A0'}{'\u00A0'} {'\u00A0'}
                <TextField
                  name= 'password'
                  label = 'password'
                  type="password"git
                  value = {this.state.password}
                  onChange = {this.handleInputChangeFor('password')}/>
                  <br/>
                <TextField
                  name= 'email'
                  label = 'email address'
                  value = {this.state.email}
                  onChange = {this.handleInputChangeFor('email')}
                  className = {classes.longField}/>
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
                </form>
              </Paper>
           </Grid>
        </Grid>
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

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));

