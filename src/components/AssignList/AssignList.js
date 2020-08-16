import React, {Component} from 'react';
import {Button, Paper, Grid, InputLabel, MenuItem, Select, FormControl} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AssignListItem from '../AssignListItem/AssignListItem';
import { Link } from 'react-router-dom';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';


const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#923cb5',
        backgroundImage: 'linear-gradient(147deg,  #000000 0%, #923cb5 74%)',
        backgroundAttachment: 'fixed',
        minHeight: '800px',
    },
    paper: {
        width: '100%',
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary, 
        margin: 2   
    },
    grid: {
        alignItems: 'flex-end',
        justify: 'center',
    },
    formControl:{
        width: 200
    },
    paper2: {
        width: '100%',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary, 
        margin: 2   
    },
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
          <br/>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            spacing = {2}>
            <Grid item  xs = {12} md = {11} lg = {10}>
                <Paper className = {classes.paper}>
                    <h1>Assign Skills</h1>
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
                            {this.state.selectedCategory ?
                            <Button color = "primary" variant = "outlined" onClick = {this.handleViewCategory}>
                                    View category
                                </Button>
                            :
                            <Button  disabled variant = "outlined"> 
                                    View category
                                </Button>
                            }   
                            {'\u00A0'} {'\u00A0'} {'\u00A0'} {'\u00A0'}
                            <Button variant = 'outlined' color = 'primary' onClick = {this.handleViewAll}>
                                <AllInclusiveIcon/>
                                View All Skills
                            </Button>
                        </Grid>
                        
                        {this.state.viewing ? <h2> Viewing {this.state.viewing}</h2> :
                        ''}
                 </Paper>
            </Grid>
          </Grid>
            {this.state.viewing ? 
            this.props.reduxState.skill.length > 0 ?
            this.props.reduxState.skill.map((item) =>
            (<AssignListItem skill = {item} key = {item.id}/>)) 
            : 
            <Grid container direction = 'column' 
                justify="center"
                alignItems="center"
                spacing = {2}>
                <Grid item xs = {12} lg = {9} xl = {7}>
                <Paper className = {classes.paper2}>
                    <h3>sorry, there are no {this.state.viewing} skill videos yet...
                    {'\u00A0'} {'\u00A0'}
                    <Link to = '/AddSkill'>Add Some here</Link></h3>
                </Paper>
                </Grid>
            </Grid>
            :
                ''}
          <br/>
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