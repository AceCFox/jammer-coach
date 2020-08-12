import React, {Component} from 'react';
import {Button, Paper, TextField, InputLabel, MenuItem, Select, FormControl, Grid, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#91d370',
        backgroundImage: 'linear-gradient(319deg, #91d370 0%, #bca0ff 37%, #f2cd54 100%)',
        height: '800px',
        alignItems: 'center',
        justify: 'center',
    },
    paper: {
        width: '95%',
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        justify: 'center',
    },
    textFeld:{
        width: 200,
    },
    longField:{
        width: '85%',
    },
   formControl:{
        width: '300px',
    },
    success:{
        color:'#4caf50',
    }
  });

class AddSelfFootage extends Component {
  state = {
    skater:'',
    url:'',
    notes:'',
    skill: '',
    lastSkill: '',
    submitted: false,
    };

    componentDidMount(){
        //dispatch saga to fetch categories
        this.props.dispatch({type: 'GET_CURRICULUM', payload: this.props.reduxState.user.id})
    }

    handleChange = (event) => {
        this.setState({ 
            ...this.state,
            [event.target.name]: event.target.value });
      };

   
    handleSubmit = () =>{
       console.log(this.state.skill)
       //clear inputs
       this.setState({
           submitted: true,
           lastSkill: this.state.skill.title,
           skill: '',
           url:'',
           skater: '',
           notes: '' 
       })
    }

    handelOk = () =>{
        this.setState({
            ...this.state,
            submitted:false,
        })
    }


  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
          <Grid container
           direction = "column"
           alignItems = "center"
           justify = 'space-between'
           >
            <Grid item xs = {12} md = {10} lg = {8} >
                <Paper className = {classes.paper}>
                    {this.state.submitted &&
                    <i className = {classes.success}>Successfully submitted your footage of {this.state.lastSkill}
                    <Button onClick = {this.handelOk}>ok</Button>
                    </i> }
                        <h2>Add Self Footage</h2>
                        {/* Eventually, this next bit should be conditional upon user != coach */}
                        <Typography nowrap>Your coach will be able to view this video of yourself completing a skill</Typography>
                        {/* A link to the add self footage page will appear here if the user is not a coach */}
                       
                        {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                        <TextField
                        id="author-in"
                        label="My Name"
                        name='author'
                        value = {this.state.author}
                        onChange = {this.handleChange}
                        className={classes.textField}
                        margin="normal"/>
                        <TextField
                        id="url-in"
                        label="*Video Url"
                        name='url'
                        value = {this.state.url}
                        onChange = {this.handleChange}
                        className={classes.longField}
                        margin="normal"/>
                        <br/>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">*Skill Pictured</InputLabel>
                            {/* TO DO: CONTROLL ALL THESE INPUTS */}
                            <Select
                                value = {this.state.skill}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'skill',
                                    id: 'skill-in',  
                                }}>
                                    <MenuItem value="">
                                    <em></em>
                                    </MenuItem>
                                    {/* TO DO: CHANGE this.state.allcategory to the category reducer props */}
                                    {this.props.reduxState.curriculum.map((skill, index) =>(
                                        <MenuItem value={skill} key ={index}>{skill.title}</MenuItem>
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
                        />
                        <br/>
                        <br/>
                        {(this.state.skill&& this.state.url) ?
                    <Button variant ='contained' color = 'primary' size = "large" onClick = {this.handleSubmit}>
                        Submit
                    </Button>
                        :
                        <Button variant ='contained' disabled size = "large">
                        Submit
                        </Button>
                        }
                </Paper> 
            </Grid>
          </Grid>
      </div>
    );
  }
}

AddSelfFootage.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = reduxState => ({
    reduxState,
  });
  
export default withStyles(styles)(connect(mapStateToProps)(AddSelfFootage));