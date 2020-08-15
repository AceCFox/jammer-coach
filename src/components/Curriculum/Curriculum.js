import React, {Component} from 'react';
import { Paper, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CurriculumItem from '../CurriculumItem/CurriculumItem';

//TO DO: make the skill select hold the id value and worry about the name for display (may need new function)


const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        minHeight: '800px',
        textAlign: 'center',
        color: theme.palette.text.secondary, 
        backgroundColor: '#91d370',
        backgroundImage: 'linear-gradient(319deg, #91d370 0%, #bca0ff 37%, #f2cd54 100%)',
        backgroundAttachment: 'fixed',
    },
    paper2: {
        width: '100%',
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,    
    },
    grid: {
        alignItems: 'flex-end',
        justify: 'center',
    },
  });

class Curriculum extends Component {
  state = {
    skater: this.props.reduxState.user,
    };

    componentDidMount(){
        //to do: replace this with the call to get skills assigned to user
        this.props.dispatch({type: 'GET_CURRICULUM', payload: this.state.skater.id})
    }

  
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <br/>
          <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing = {2}>
              <Grid item xs = {12} md = {11} lg = {10}>
                  <Paper className = {classes.paper2}>
                      <h1>{this.state.skater.username}'s  Skating Curriculum</h1> 
                  </Paper> 
              </Grid>  
              <Grid item xs = {12} md = {11} lg = {10}>   
                  {/* Maps each skill in user's curriuculum onto a CurriculumItem component */}
                  {this.state.skater ? this.props.reduxState.curriculum.map((item, index) =>
                  (<CurriculumItem skill = {item} key = {index}/>)) :
                      ''} 
              </Grid> 
          </Grid>          
      </div>
    );
  }
}

Curriculum.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(Curriculum));