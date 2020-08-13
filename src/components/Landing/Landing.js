import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Paper, Grid,} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
      flexGrow: 1,
      alignItems: 'center',
      justify: 'center',
      backgroundColor: '#726cf8',
      backgroundImage: 'url(https://www.mnrollerderby.com/wp-content/uploads/2018/10/44053660_10160939688445150_1500571125506113536_o-1024x639.jpg)',
      height: '640px'
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

class Landing extends Component {

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
            Welcome to Jammer Coach
          </h1>
         
          </Paper>
        </Grid>
        <br/>
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(Landing));
