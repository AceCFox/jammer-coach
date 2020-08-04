import React, {Component} from 'react';
import {Button, Paper, TextField, InputLabel, MenuItem, Select, FormControl, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/lazy'


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
    video :{
        maxWidth: '100%',
    },
    formControl: {
        minWidth: 200,
    },
    longField:{
        width: '85%',
    },
  });

class AssignListItem extends Component {
  state = {
    selected: '',
    tempSkater:['Homo Erratic', 'Tobi Determined', 'Polly Pocketknife', 'Animal', 'Moose Definitely', 'Whacks Poetic'],
    notes: '',
    submitted: false
    };

    componentDidMount(){
        //dispatch saga to fetch username list
    }
  
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }

    handleAssign =()=>{
       console.log('Assigned skill to ', this.state.selected, 'with notes:', this.state.notes);
       //Figure out how to alert user of click
       this.setState({
            ...this.state,
            submitted:true})
    }

    handleOk = () =>{
        this.setState({
            ...this.state,
            submitted:false})
    }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
          <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                spacing = {4}>
               <Grid item xs = {12} md = {8}>
                    <Paper className = {classes.paper}>
                    <ReactPlayer url= 'https://www.youtube.com/watch?v=B0dxCne9zpc' controls = {true} 
                        className = {classes.video}/>
                    </Paper>
               </Grid>
               <Grid item xs = {12} md = {4}> 
                    <Paper className = {classes.paper}>
                    {(this.state.submitted && this.state.selected )? 
                    <i>Successsfully submitted to {this.state.selected}'s curriculum
                         <Button onClick = {this.handleOk}>ok</Button>    
                    </i> 
                    : ''
                    }
                    <h2>Skill Name</h2>
                        <FormControl className={classes.formControl}>     
                        <InputLabel>Skater</InputLabel>
                            <Select
                                value = {this.state.selected}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'selected', 
                                }}>
                                    <MenuItem value="">
                                    <em></em>
                                    </MenuItem>
                                    {/* TO DO: CHANGE this.state.allcategory to the category reducer props */}
                                    {this.state.tempSkater.map((category, index) =>(
                                        <MenuItem value={category} key ={index}>{category}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        
                        <TextField
                            label="Notes"
                            name ='notes'
                            value = {this.state.notes}
                            onChange = {this.handleChange}
                            multiline
                            rowsMax="4"
                            className={classes.longField}
                            margin="normal"
                            />
                            <br/>
                            <br/>
                            <br/>
                        <Button variant = 'contained' color = 'primary' onClick = {this.handleAssign}>
                            Assign Skill
                        </Button>
                    </Paper>
               </Grid>
          </Grid>
      </div>
    );
  }
}

AssignListItem.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(AssignListItem));