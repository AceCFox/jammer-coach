import React, {Component} from 'react';
import {Button, Paper,  Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/lazy'


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
        backgroundColor: '#c5cae9',
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
       console.log(this.props.footage)
    }
    
    handleOpen = () =>{
        this.setState({
            open: true,
        })
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
                        <h2>{this.props.footage.added_by}'s Footage</h2>
                        <p>{this.props.footage.notes}</p>
                        <Button variant = 'outlined' color = 'secondary'
                        onClick = {this.handleOpen}>
                            Delete this footage
                        </Button>
                    </Grid>
                  </Grid>
                </Paper>
             </Grid>  
          </Grid>
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