import React, {Component} from 'react';
import {Button, Paper, Grid, InputLabel, MenuItem, Select, FormControl} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AssignListItem from '../AssignListItem/AssignListItem';

//TO DO: make the skill select hold the id value and worry about the name for display (may need new function)


const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'flex-end'
    },
    paper: {
        width: '90%',
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

class AssignList extends Component {
  state = {
    selectedCategory: '',
    viewing: '',
    };

    componentDidMount(){
        //dispatch saga to fetch categories
        this.props.dispatch({type: 'GET_CATEGORY'})
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
    handleViewCategory = () => {
        this.setState({
            ...this.state,
            viewing: this.state.selectedCategory.name
        })
        console.log('selcted category id:', this.state.selectedCategory.id)
        //dispatch saga to get all skill_category JOIN skill where id = category.id
        //set results to state
        this.props.dispatch({type:'GET_SKILL_CATEGORY', payload: this.state.selectedCategory.id})
    }

    handleViewAll = () => {
        this.setState({
            ...this.state,
            viewing: 'all skills',
        })
        //dispatch saga to get ALL THE SKILLS
        this.props.dispatch({type: 'GET_ALL_SKILL'})
    }
  

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
          <Paper className = {classes.paper}>
            <h1>Assign a Skill:</h1>
              <Grid  container
                direction="row"
                justify="center"
                alignItems="flex-end">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Category</InputLabel>
                    <Select
                        value = {this.state.selectedCategory}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'selectedCategory',
                            id: 'category-in',  
                        }}>
                            <MenuItem value="">
                            <em></em>
                            </MenuItem>
                            {/* TO DO: CHANGE this.state.allcategory to the category reducer props */}
                            {this.props.reduxState.category.map((category, index) =>(
                                <MenuItem value={category} key ={index}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button color = "primary" variant = "outlined" onClick = {this.handleViewCategory}>
                            View category
                        </Button>
                    {'\u00A0'} {'\u00A0'} {'\u00A0'} {'\u00A0'}
                    <Button variant = 'outlined' color = 'primary' onClick = {this.handleViewAll}>
                        View All Skills
                    </Button>
                </Grid>
                {this.state.viewing ? <h2> Viewing {this.state.viewing}</h2> :
                 ''}
             {this.state.viewing ? this.props.reduxState.skill.map((item) =>
             (<AssignListItem skill = {item} key = {item.id}/>)) :
                 ''}
          </Paper>
      </div>
    );
  }
}

AssignList.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(AssignList));