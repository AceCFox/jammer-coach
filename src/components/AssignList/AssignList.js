import React, {Component} from 'react';
import {Button, Paper, Grid, InputLabel, MenuItem, Select, FormControl} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AssignListItem from '../AssignListItem/AssignListItem';


const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center'
    },
    paper: {
        width: '90%',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,    
    },
    grid: {
        alignItems: 'center',
        justify: 'center',
    }
  });

class AssignList extends Component {
  state = {
    selectedCategory: '',
    tempCategory:['hockey stop', 'plow', 'edges', 'toe stop', 'agility', 'crossover'],
    skillList: [{id: 1}, {id: 2}, {id: 3}]
    };

    componentDidMount(){
        //dispatch saga to fetch categories skters
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
    handleViewCategory = () => {
        
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
                alignItems="center">
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
                            {this.state.tempCategory.map((category, index) =>(
                                <MenuItem value={category} key ={index}>{category}</MenuItem>
                            ))}
                        </Select>
                        <Button color = "primary" onClick = {this.handleSelect}>View category</Button>
                    </FormControl>
                    {'\u00A0'} {'\u00A0'} {'\u00A0'} {'\u00A0'}
                    <Button variant = 'outlined' color = 'primary'>View All Skills</Button>
                    </Grid>
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