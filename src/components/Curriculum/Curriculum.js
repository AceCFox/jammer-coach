import React, {Component} from 'react';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CurriculumItem from '../CurriculumItem/CurriculumItem';

//TO DO: make the skill select hold the id value and worry about the name for display (may need new function)


const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'flex-end'
    },
    paper: {
        width: '95%',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,    
    },
    grid: {
        alignItems: 'flex-end',
        justify: 'center',
    },
    formControl:{
        width: 200
    }
  });

class Curriculum extends Component {
  state = {
    skater: this.props.reduxState.user,
    };

    componentDidMount(){
        //to do: replace this with the call to get skills assigned to user
        this.props.dispatch({type: 'GET_ALL_SKILL'})
    }

  
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
          <Paper className = {classes.paper}>
              <h1>{this.state.skater.username}'s  Skating Curriculum</h1>   
              {/* TO DO: REPLACE skill with user_skill */}
             {this.state.skater ? this.props.reduxState.skill.map((item) =>
             (<CurriculumItem skill = {item} key = {item.id}/>)) :
                 ''}
          </Paper>
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