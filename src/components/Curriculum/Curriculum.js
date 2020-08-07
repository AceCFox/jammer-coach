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
        alignItems: 'center'
    },
    paper1: {
        width: '99%',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary, 
        backgroundColor: '#80deea',   
        alignItems: "center",
        borderRadius:0,
    },
    paper2: {
        width: '98%',
        padding: theme.spacing(2),
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
          <Paper className = {classes.paper1}>
            <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing = {2}>
                <Grid item xs = {12}>
                    <Paper className = {classes.paper2}>
                        <h1>{this.state.skater.username}'s  Skating Curriculum</h1> 
                    </Paper> 
                </Grid>  
                <Grid item xs = {12}>   
                    {/* TO DO: REPLACE skill with user_skill */}
                    {this.state.skater ? this.props.reduxState.curriculum.map((item, index) =>
                    (<CurriculumItem skill = {item} key = {index}/>)) :
                        ''} 
                </Grid> 
            </Grid>          
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