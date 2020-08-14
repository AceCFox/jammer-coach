import React, {Component} from 'react';
import {Button, Paper, TextField, InputLabel, MenuItem, Select, FormControl, Grid, Snackbar, IconButton} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/lazy'
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        justify:'center,'
    },
    paper: {
        width: '100%',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        justify: 'center'
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
    submitted: false,
    lastSelected: ''
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
            lastSelected: this.state.selected.username,
            selected: '',
            notes: '',
            submitted: true,})
    }

    handleOk = (event, reason) =>{
        if (reason === 'clickaway') {
            return;
          } else { 
              this.setState({
            ...this.state,  
            submitted: false,})
        }
    }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
         <Grid container
            direction="column"
            justify="center"
            alignItems="center"
            spacing = {4}>
             <Grid item xs = {12} lg = {9} xl = {7}>         
                <Paper className = {classes.paper}>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing = {0}>
                        <Grid item xs = {12} md = {8}>
                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="center">
                                <ReactPlayer url= {this.props.skill.url} 
                                    controls = {true} 
                                    alt = {this.props.skill.description} 
                                    className = {classes.video}/> 
                            </Grid>
                        </Grid>
                    <Grid item xs = {12} md = {4}> 
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
                                    {/* populates list with all usernames from redux state */}
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
                    </Grid>
                  </Grid>
                </Paper>
             </Grid>  
          </Grid>
          {/* This snackbar lets a use know they have assigned a skill */}
          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.submitted}
          autoHideDuration={6000}
          onClose={this.handleOk}
          cvariant="success"
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">
                Successfully assigned to {this.state.lastSelected}'s curriculum
              </span>}
          action={[
            <IconButton
              color="inherit"
              onClick={this.handleOk}
              key="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
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