import React, {Component} from 'react';
import {Button, Paper, Grid, InputLabel, MenuItem, Select, FormControl} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ManageSkaterItem from  '../ManageSkaterItem/ManageSkaterItem';
import FootageItem from '../FootageItem/FootageItem';

//TO DO: make the skill select hold the id value and worry about the name for display (may need new function)


const styles = theme => ({
    root: {
        flexGrow: 2, 
        alignItems: 'center',
        minHeight: '800px',
        backgroundColor: '#bbf0f3',
        backgroundImage: 'linear-gradient(315deg, #bbf0f3 0%, #f6d285 74%)',
    },
    paper: {
        width: '100%',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,    
    },
    grid: {
        alignItems: 'center',
        justify: 'center',
    },
    formControl:{
        width: 200
    },
  });

class ManageSkater extends Component {
  state = {
    selectedSkater: '',
    viewing: '',
    };

    componentDidMount(){
        //dispatch saga to fetch categories
        this.props.dispatch({type: 'GET_SKATER'})
        this.props.dispatch({type: 'FETCH_FOOTAGE'})
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
    handleViewskater = () => {
        this.setState({
            ...this.state,
            viewing: this.state.selectedSkater
        })
        console.log('selcted skater id:', this.state.selectedSkater.id)
        //dispatch saga to get all skill_category JOIN skill where id = category.id
        //set results to state
        this.props.dispatch({type:'GET_CURRICULUM', payload: this.state.selectedSkater.id})
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
            <Grid item  xs = {12} sm = {11} md = {10} lg = {9} xl = {8}>
            <Paper className = {classes.paper}>
                <h1>Manage Skaters</h1>
                <Grid  container
                    direction="row"
                    justify="center"
                    alignItems="flex-end">
                    
                    <FormControl className={classes.formControl}>
                        <InputLabel >Skaters</InputLabel>
                        <Select
                            value = {this.state.selectedSkater}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'selectedSkater',
                                id: 'category-in',  
                            }}>
                                <MenuItem value="">
                                <em></em>
                                </MenuItem>
                                {this.props.reduxState.allSkater.map((user, index) =>(
                                    <MenuItem value={user} key ={index}>{user.username}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {this.state.selectedSkater ?
                        <Button color = "primary" variant = "outlined" onClick = {this.handleViewskater}>
                                View Skater's Curriculum
                            </Button>
                        :
                        <Button  disabled variant = "outlined"> 
                                View Skater's Curriculum
                            </Button>
                        }   
                    </Grid>
                   
                    {this.state.viewing ? 
                    <div>
                        <h2> Viewing {this.state.viewing.username}'s Curriculum</h2> 
                        <i>{this.state.viewing.email}</i>
                        
                        <Grid  container
                            direction="row"
                            justify="center"
                            alignItems="flex-end"
                            spacing = {4}
                            padding = {2}>
                            <Grid item xs = {12} md= {6}>
                                {this.state.viewing.bio 
                                ? 
                                <>
                                    <h3>Bio</h3> 
                                    <p>{this.state.viewing.bio}</p>
                                </>
                                :
                                ''
                                }
                            </Grid>
                            <Grid item xs = {12} md = {6}>
                                {this.state.viewing.goals ?
                                <>
                                    <h3>Skater Goals</h3> 
                                    <p>{this.state.viewing.goals}</p>
                                </>
                            : '' }
                            </Grid>
                        </Grid>
                        </div>
                        
                    
                    :
                    ''}
                     </Paper>
                    </Grid>
                </Grid>
                <br/>
             {this.state.viewing ? 
             this.props.reduxState.curriculum.map((item, index) =>
                (
                    <div key = {index}>
                        <ManageSkaterItem skater = {this.state.viewing} skill = {item}/>     
                            {this.props.reduxState.footage.map((footage, index) => (
                            (footage.user_skill_id === item.id)
                            ?
                            <FootageItem key = {index} footage = {footage}/> 
                            :
                            ''
                        ))}
                    </div>
                )) 
             :
            ''
            }
      </div>
    );
  }
}

ManageSkater.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(ManageSkater));