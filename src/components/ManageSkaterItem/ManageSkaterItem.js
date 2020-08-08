import React, {Component} from 'react';
import {Button, Paper, TextField, Grid, } from '@material-ui/core';
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
        width: '95%',
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

class ManageSkaterItem extends Component {
  state = {
    notes: this.props.skill.coach_notes,
    submitted: false,
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }
    
    componentDidMount(){
        if (this.state.notes){
            this.setState({
                ...this.state,
                submitted:true
            })
        }
    }
    
    submitNotes= () => {
        this.setState({
            ...this.state.notes,
            submitted: true
        })
        const submitObject = {
            user_id: this.props.reduxState.user.id,
            skill_id: this.props.skill.id,
            notes: this.state.notes,
        };
        console.log(submitObject);
        //dispatch Saga with action type 'UPDATE_SKATER_NOTE'
        this.props.dispatch({type: 'UPDATE_COACH_NOTE', payload: submitObject})
    }  

    handleEdit = () => {
        this.setState({...this.state, submitted: false,})
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
            <Grid item  xs = {12} lg = {9} xl = {7}>
                <Paper className = {classes.paper}>
                    <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing = {4}>
                            <Grid item xs = {12} md = {8}>
                                <ReactPlayer url= {this.props.skill.url} 
                                    controls = {true} 
                                    alt = {this.props.skill.description} 
                                    className = {classes.video}/>
                                <br/>
                                <Button variant = "contained" color = "secondary">
                                     Remove skill
                                </Button> 
                        </Grid>
                        <Grid item xs = {12} md = {4}> 
                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                spacing = {2}>
                                    <Grid item xs = {12}>
                                        <h2>{this.props.skill.title}</h2>
                                        {this.state.submitted ?
                                         <>
                                            <h4>Instructions</h4>
                                            <p>{this.state.notes}</p>
                                         </>
                                      :
                                      <>
                                        <TextField
                                            label="instructions"
                                            name ='notes'
                                            value = {this.state.notes}
                                            onChange = {this.handleChange}
                                            multiline
                                            rowsMax="4"
                                            className={classes.longField}
                                            margin="normal"
                                            />
                                        <br/>
                                        </>}
                                        <br/>
                                        {this.state.submitted ?
                                            <Button variant = 'contained'
                                                onClick={this.handleEdit}>
                                               Edit Instructions
                                            </Button>
                                        :
                                            <Button variant = 'contained' color = 'primary'
                                                onClick  = {this.submitNotes}>
                                                 Save Instructions
                                            </Button>
                                        } 
                                    </Grid>
                                    <Grid item xs = {12} >
                                    { this.props.skill.skater_notes ?
                                        <>
                                        <h4>{this.props.skater.username}'s notes:</h4>
                                        <p>{this.props.skill.skater_notes}</p>
                                        </>
                                        : ''
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>      
                     </Grid>
                </Paper>
            </Grid>
          </Grid>
      </div>
    );
  }
}

ManageSkaterItem.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(ManageSkaterItem));