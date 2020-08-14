import React, {Component} from 'react';
import {Button, Paper, TextField, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/lazy'

//this component is a single

const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        justify: 'center',
    },
    paper: {
        width: '100%',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ustify: 'center'
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

class CurriculumItem extends Component {
  state = {
    notes: '',
    submitted: false,
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }
    
    componentDidMount(){
        if (this.props.skill.skater_notes){
            this.setState({
                notes: this.props.skill.skater_notes,
                submitted: true
            }) 
        }
    }


    componentDidUpdate(previousProps){
        if (previousProps.skill.skater_notes !== this.props.skill.skater_notes){
            this.setState({
                notes: this.props.skill.skater_notes,
                submitted: true
            })
        }
    }
    
    submitNotes= () => {
       
        const submitObject = {
            user_id: this.props.skill.user_id,
            skill_id: this.props.skill.id,
            notes: this.state.notes,
        };
        console.log(submitObject);
        //dispatch Saga with action type 'UPDATE_SKATER_NOTE'
        this.props.dispatch({type: 'UPDATE_SKATER_NOTE', payload: submitObject})

        this.setState({
            ...this.state,
            submitted: true,
        })
    }  


    handleEdit = () => {
        this.setState({...this.state, submitted: false,})
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
                spacing = {4}>
            <Grid item  xs = {12} lg = {9} xl = {7}>
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
                                    className = {classes.video}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs = {12} md = {4}> 
                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                spacing = {0}>
                                        <h2>{this.props.skill.title}</h2>
                                        <p>{this.props.skill.coach_notes}</p>
                                      {this.state.submitted ?
                                         <>
                                            <i>Note Submitted:</i>
                                            <p>{this.state.notes}</p>
                                         </>
                                      :
                                        <TextField
                                            label="Notes"
                                            name ='notes'
                                            value = {this.state.notes}
                                            onChange = {this.handleChange}
                                            multiline
                                            rowsMax="4"
                                            className={classes.longField}
                                            margin="normal"
                                            />}
                                        <br/>
                                        <br/>
                                        {this.state.submitted ?
                                            <Button variant = 'outlined'
                                                onClick={this.handleEdit}>
                                               Edit Notes
                                            </Button>
                                        :
                                            <Button variant = 'outlined' color = 'primary'
                                                onClick  = {this.submitNotes}>
                                                 Submit Notes
                                            </Button>
                                        }
                                    </Grid>
                                {/* </Grid> */}
                            </Grid>      
                    </Grid>
                </Paper>
            </Grid>
          </Grid>
          <br/>
      </div>
    );
  }
}

CurriculumItem.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(CurriculumItem));