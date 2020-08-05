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
    notes: '',
    submitted: false
    };

    componentDidMount(){
        //dispatch saga to fetch username list
        //displatch saga to fetch skaters
        this.props.dispatch({type: 'GET_SKATER'})
    }
  
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }

    handleAssign =()=>{
       const postObject = {skill_id: this.props.skill.id,
                            user_id: this.state.selected.id,
                            coach_notes: this.state.notes }
       console.log(postObject);
       //call saga to POST postobject to user_skill
       this.props.dispatch({type: 'ASSIGN_SKILL', payload: postObject}) 
       //alert user of successful assign
       this.setState({
            selected: '',
            notes: '',
            submitted: true,})
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
                    <ReactPlayer url= {this.props.skill.url} controls = {true} 
                        className = {classes.video}/>
                    </Paper>
               </Grid>
               <Grid item xs = {12} md = {4}> 
                    <Paper className = {classes.paper}>
                    {(this.state.submitted && this.state.selected )? 
                    <i>Successsfully submitted to {this.state.selected.username}'s curriculum
                         <Button onClick = {this.handleOk}>ok</Button>    
                    </i> 
                    : ''
                    }
                    <h2>{this.props.skill.title}</h2>
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
                                    {/* TO DO: CHANGE this.state.tempSkater to the skater reducer props */}
                                    {this.props.reduxState.allSkater.map((skater) =>(
                                        <MenuItem value={skater} key ={skater.id}>{skater.username}</MenuItem>
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