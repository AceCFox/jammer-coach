import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import paxos from './paxos.jpg';

const styles = theme => ({
  root: {
      flexGrow: 1,
      alignItems: 'center',
      justify: 'center',
      backgroundColor: '#923cb5',
      backgroundImage: 'linear-gradient(147deg,  #000000 0%, #923cb5 74%)',
      backgroundAttachment: 'fixed',
      minHeight: '800px'
      
  },
  paper: {
      width: '90%',
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      justify: 'center',

  }
});

class AboutPage extends Component {
  

 
  render() {
    const {classes} = this.props;
    return (
      <div className = {classes.root}>
        <br/>
        <Grid container
          direction = 'row'
          justify = 'center'
          alignItems = "center"
          spacing = {2}>
            <Grid item xs = {12} sm = {11} md = {10}>
              <Paper className = {classes.paper}>
                <i>This app was built using react.js, Material-UI,
                  Redux, Sagas, Express, Node, PostgreSql, and React-Player
                </i>
                <h3>Thank You, Prime Digital Academy, and Paxos Cohort</h3>
                <img src = {paxos}/>
                <h1>BIRD UP!</h1>
              </Paper>
            </Grid>
         <br/>
         </Grid>
      </div>
    );
  }
}

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired
};

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(AboutPage));
