import React, { Component } from 'react';
import { connect, } from 'react-redux';
import {Button,  TextField, Grid, Paper,} from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
      flexGrow: 1,
      alignItems: 'center',
      justify: 'center',
      backgroundImage: 'url(https://s3.amazonaws.com/ezusrevent/EFBB7EBD90553C784141DD8D25197029D540EE1F92DAF3EC12.jpg)',
      height: "1350px"
      
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
  }

});

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div className = {classes.root}>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <br/>
        <br/>
        <Grid container
         direction = 'column'>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs = {12} sm = {9} md = {7} lg = {5} xl = {3}>
              <Paper className = {classes.paper}>
                <form onSubmit={this.login}>
                  <h1 className = {classes.login}>LOG IN</h1>
                  <i>Ready for practice?</i>
                  <br/>
                    <TextField name="username"
                    label = "username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChangeFor('username')}/>
                    
                  
                  <div>
                   
                      <TextField
                        type="password"
                        name="password"
                        label = "password"
                        value={this.state.password}
                        onChange={this.handleInputChangeFor('password')}
                      />
                
                  </div>
                  <div>
                    <br/>
                    <Button
                      onClick ={this.login}
                      name="submit"
                      value="Log In"
                      variant = "contained"
                      color = "primary"
                    >
                      Log in
                    </Button>
                  </div>
                  <br/>   
                    <i>New skater? </i>
                    {'\u00A0'} {'\u00A0'}
                  <Button 
                    variant = 'outlined' color = "primary"
                    onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
                  >
                    Register Here
                  </Button> 
                </form>
                </Paper>
            </Grid>
          </Grid>
        </Grid>
        <br/>
        <br/>
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
