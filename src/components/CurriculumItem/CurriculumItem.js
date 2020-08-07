import React, {Component} from 'react';
import {Button, Paper, TextField, Grid} from '@material-ui/core';
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

class CurriculumItem extends Component {
  state = {
    notes: '',
    submitted: false,
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }
    
    submitNotes= () => {
        this.setState({
            ...this.state.notes,
            submitted: true
        })
         
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
                        </Grid>
                        <Grid item xs = {12} md = {4}> 
                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                spacing = {2}>
                                    <Grid item xs = {12}>
                                        <h2>{this.props.skill.title}</h2>
                                        <p>Coach notes will go here </p>
                                    </Grid>
                                    <Grid item xs = {12} >
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
                                            <Button variant = 'outlined' disabled>
                                                Submit Notes
                                            </Button>
                                        :
                                            <Button variant = 'outlined' color = 'primary'
                                                onClick  = {this.submitNotes}>
                                                 Submit Notes
                                            </Button>
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

CurriculumItem.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(CurriculumItem));