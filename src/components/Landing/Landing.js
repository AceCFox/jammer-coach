import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Paper, Grid,} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import VideocamIcon from '@material-ui/icons/Videocam';
import { Link } from 'react-router-dom';


const styles = theme => ({
  root: {
      flexGrow: 2,
      alignItems: 'center',
      justify: 'center',
      backgroundColor: 'black',
      backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/5b7e168725bf02338601dd50/1534993658578-3NPEWQJERIOO4IX3B82Q/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/derby-13.jpg)',
      minHeight: '800px',
      backgroundPosition:'center bottom',
      backgroundRepeat: 'no-repeat',
      backgrountAttachment: 'fixed',
  },
  paper: {
      width: '100%',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      justify: 'center',
  },
});

class Landing extends Component {

  render() {
    const {classes} = this.props;
    return (
      <div className = {classes.root}>
         {/* <br/> */}
        <Grid container direction="row"
            justify="center"
            alignItems="center">
          <Grid item xs = {12} md = {11} lg = {10} xl = {9}>
            <Paper className ={classes.paper}>
                <h1 id="welcome">
                    Welcome to Jammer Coach
                </h1>
                <i>What would you like to do?</i>
                <br/>
                <br/> 
                <Grid container direction="row"
                    justify="center"
                    alignItems="center"
                    spacing = {1}>
                    {this.props.user.is_coach?
                    <>
                        <Grid item xs = {12} sm = {6} md ={3}>
                            <Button variant = 'contained' color = 'primary'
                            component = {Link} to = '/manage'>
                                Manage Skaters
                            </Button>
                        </Grid>
                        <Grid item xs = {12} sm = {6} md ={3}>
                            <Button variant = 'contained'
                            component = {Link} to = '/AssignList'>
                                Assign Skills
                            </Button>
                        </Grid>
                    </>
                    :
                    <> 
                        <Grid item xs = {12} sm = {6} md ={3}>
                            <Button variant ='contained' color = 'primary'
                            component = {Link} to = '/curriculum'>
                                View My Curriculum
                            </Button>
                        </Grid>
                        <Grid item  xs = {12} sm = {6} md = {3}>
                        
                        <Button variant ='contained' color = 'primary'
                        component = {Link} to = '/footage'>
                            Add My Footage
                        </Button>
                        </Grid>
                    </>
                    }
                <br/>
                <br/>
                </Grid>
            </Paper>
          </Grid>
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
