import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import {Button, Paper, Grid, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
      flexGrow: 1,
      alignItems: 'center',
      justify: 'center',
      backgroundColor: '#726cf8',
      backgroundImage: 'linear-gradient(315deg, #726cf8 0%, #e975a8 74%)'
      
  },
  paper: {
      width: '90%',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      justify: 'center',
  },
  textFeld:{
      width: 300,
  },
  longField:{
      width: '85%',
  },
  categoryList:{
      listStyle: 'inside',
  }
});

class UserPage extends Component {
  state = {
    email: this.props.user.email || '',
    bio: this.props.user.bio || '',
    goals: this.props.user.goals || '',
    editEmail: false,
    editBio: false,
    editGoals: false, 
  }

  componentDidMount(){
    //this.props.dispatch({type: 'FETCH_USER'})
    if(this.props.user.email){
      this.setState({
        ...this.state,
        email: this.props.user.email
      })
    }
    if(this.props.user.bio){
      this.setState({
        ...this.state,
        bio: this.props.user.bio
      })
    }
    if(this.props.user.goals){
      this.setState({
        ...this.state,
        goals: this.props.user.goals
      })
    }
  }

  handleChange = (event) => {
    this.setState({
        ...this.state,
       [event.target.name]: event.target.value });
  };

  handleEditEmail = (event) =>{
    this.setState({
      ...this.state,
      editEmail: true,
    })
  }

  saveEmail = () => {
    //dispatch Saga to UPDATE EMAIL
    const putObject = {
      email: this.state.email,
      id: this.props.user.id,
    }
    this.props.dispatch({type: 'PUT_EMAIL', payload: putObject})
    this.setState({
      ...this.state,
      editEmail: false,
    })
  }

  editBio = () => {
    this.setState ({
      ...this.state,
      editBio: true,
    })
  }

  saveBio = () => {
    const putObject = {
      bio: this.state.bio,
      id: this.props.user.id,
    }
    //dispatch Saga to UPDATE BIO
    this.props.dispatch({type: 'PUT_BIO', payload: putObject})
    //set back to Not edit
    this.setState({
      ...this.state,
      editBio:false,
    })
  }

  editGoals = () => {
    this.setState ({
      ...this.state,
      editGoals: true,
    })
  }

  saveGoals = () => {
    const putObject = {
      goals: this.state.goals,
      id: this.props.user.id,
    }
    //dispatch Saga to UPDATE BIO
    this.props.dispatch({type: 'PUT_GOALS', payload: putObject})
    //set back to Not edit
    this.setState({
      ...this.state,
      editGoals:false,
    })
  }


  
  render() {
    const {classes} = this.props;
    return (
      <div className = {classes.root}>
         <br/>
        <Grid container direction="row"
            justify="center"
            alignItems="flex-end">
         
          <Paper className ={classes.paper}>
          <h1 id="welcome">
            Welcome, {this.props.user.is_coach && <b>coach </b>}{this.props.user.username}!
          </h1>
            {this.state.editEmail? 
            <Grid  container
            direction="row"
            justify="center"
            alignItems="flex-end">
               <TextField
                id="email-in"
                label="email"
                name='email'
                value = {this.state.email}
                onChange = {this.handleChange}
                className={classes.textField}
                margin="normal"/>
                {'\u00A0'}{'\u00A0'}
              <Button variant = "outlined" color = "primary"
                onClick = {this.saveEmail}>
                Save Email
              </Button>
            </Grid>
            :
            this.state.email ? 
            <Grid  container
            direction="column"
            justify="center"
            alignItems="center">
              <i>Your Email address is saved as <b>{this.state.email}</b></i>
              {/* {'\u00A0'}{'\u00A0'} */}
              <br/>
              <Button variant = "outlined"
               onClick = {this.handleEditEmail}>
                Edit Email
              </Button>
             </Grid>
             :
             <Grid  container
             direction="column"
             justify="center"
             alignItems="center">
              <i>Please add an email address</i>
              {/* {'\u00A0'}{'\u00A0'} */}
              <br/>
              <Button variant = "outlined" color = "secondary"
                onClick = {this.handleEditEmail}>
                Add Email
              </Button>
             </Grid>
            }
            <br/>
            {this.state.editBio ?
             <Grid  container
             direction="column"
             justify="center"
             alignItems="center">
              <i>Tell us a little about yourself</i>
              {/* {'\u00A0'}{'\u00A0'} */}
              {/* <br/> */}
              <TextField
                label="My Bio"
                name ='bio'
                value = {this.state.bio}
                onChange = {this.handleChange}
                multiline
                rowsMax="6"
                className={classes.longField}
                margin="normal"
                />
              <Button variant = "outlined" color = "primary"
                onClick = {this.saveBio}>
                Save Bio
              </Button>
             </Grid>
            :
            this.state.bio?
            <Grid  container
             direction="column"
             justify="center"
             alignItems="center">
                <h3>My Saved Bio</h3>
                <p>{this.state.bio}</p>
                <Button variant = 'outlined'
                  onClick = {this.editBio}
                >
                  Edit bio
                </Button>
            </Grid>
            :
            <Grid  container
             direction="column"
             justify="center"
             alignItems="center">
               <i>Please add a bio to tell us about yourself</i>
               <br/>
               <Button variant = 'outlined' color = 'secondary'
                  onClick = {this.editBio}>
                  Add Bio
               </Button>
            </Grid>
            }
            <br/>
            {this.state.editGoals?
            <Grid  container
            direction="column"
            justify="center"
            alignItems="center">
             <i>What are your Goals for the season?</i>
             {/* {'\u00A0'}{'\u00A0'} */}
             {/* <br/> */}
             <TextField
               label="My Goals"
               name ='goals'
               value = {this.state.goals}
               onChange = {this.handleChange}
               multiline
               rowsMax="6"
               className={classes.longField}
               margin="normal"
               />
             <Button variant = "outlined" color = "primary"
               onClick = {this.saveGoals}>
               Save Goals
             </Button>
            </Grid>
           :
           this.state.goals?
           <Grid  container
            direction="column"
            justify="center"
            alignItems="center">
               <h3>My Season Goals</h3>
               <p>{this.state.goals}</p>
               <Button variant = 'outlined'
                 onClick = {this.editGoals}
               >
                 Edit Goals
               </Button>
           </Grid>
            :
            <Grid  container
            direction="column"
            justify="center"
            alignItems="center">
              <i>Please tell us your goals for the season</i>
              <br/>
              <Button variant = 'outlined' color = 'secondary'
                 onClick = {this.editGoals}>
                 Add Goals
              </Button>
           </Grid> 
            }
            <p>Your ID is: {this.props.user.id}</p>
            <LogOutButton className="log-in" />
          </Paper>
        </Grid>
        <br/>
      </div>
    );
  }
}

UserPage.propTypes = {
  classes: PropTypes.object.isRequired
};

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(UserPage));
