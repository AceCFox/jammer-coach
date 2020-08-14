import React, {Component} from 'react';
import {Button, Paper,  Grid, Dialog, DialogContent, DialogActions, DialogContentText} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/lazy'
import DeleteIcon from '@material-ui/icons/Delete';
import FastRewindIcon from '@material-ui/icons/FastRewind';


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
        color: '#616161',
        backgroundColor: '#f0f4c3',
        justify: 'center'
    },
    video :{
        maxWidth: '100%',
    },
  });

class FootageItem extends Component {
  state = {
    open: false,
    };

    componentDidMount(){
      this.props.dispatch({type: 'FETCH_FOOTAGE'})
       //console.log(this.props.footage)
    }
    
    handleOpen = () =>{
        this.setState({
            open: true,
        })
    }

   handleDelete = () => {
     const id = this.props.footage.id
  // console.log(id);
    this.props.dispatch({type: 'DELETE_FOOTAGE', payload: id})
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
             <Grid item xs = {12} sm = {11} md ={9} lg = {8} xl = {7}>         
                <Paper className = {classes.paper}>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing = {3}>
                        <Grid item xs = {12} md = {8}>
                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="center">
                                <ReactPlayer url= {this.props.footage.url} 
                                    controls = {true} 
                                    alt = {this.props.footage.added_by}
                                    className = {classes.video}/> 
                            </Grid>
                        </Grid>
                    <Grid item xs = {12} md = {4}> 
                        <h2>{this.props.footage.added_by ?
                           this.props.footage.added_by + `'s `
                           :
                           `Skater `
                           }
                           Footage</h2>
                          <h3>of {this.props.skill.title}</h3>
                        <p>{this.props.footage.notes}</p>
                        <Button variant = 'outlined' color = 'secondary'
                        onClick = {this.handleOpen}>
                           <DeleteIcon/> Delete this Footage
                        </Button>
                    </Grid>
                  </Grid>
                </Paper>
             </Grid>  
          </Grid>
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}>
              <DialogContent>
                  <DialogContentText>
                     Are you sure you want to delete this footage?
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant = "outlined" color = "primary" onClick = {this.handleClose}>
                    <FastRewindIcon/> Oops, NO
                </Button>
                <Button variant = "outlined" color = "secondary" onClick = {this.handleDelete}>
                    <DeleteIcon/> YES, delete
                </Button>
              </DialogActions>
          </Dialog>
      </div>
    );
  }
}

FootageItem.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(FootageItem));