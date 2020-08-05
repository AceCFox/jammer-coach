import React, {Component} from 'react';
import {Button, Paper, TextField, InputLabel, MenuItem, Select, FormControl, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/lazy'


const styles = theme => ({
    root: {
        flexGrow: 2,
        alignItems: 'center'
    },
    paper: {
        width: '95%' ,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    video :{
        maxWidth: '100%',
        width: '200px',
        maxHeight: '175px',
    },
    formControl: {
        minWidth: 200,
    },
    longField:{
        width: '85%',
    },
  });

class EditSkillItem extends Component {
    state = {
        edit: false,
        catagories: []
    }

    componentDidMount(){
       // dispatching a saga to get all the skill_catagory
      this.setCatagories();
    }
    
    setCatagories = () =>{
      //to do
     
    }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
          <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                spacing = {2}>
               <Grid item xs = {12} sm = {6} md = {4}>
                    <Paper className = {classes.paper}>
                       {!this.state.edit ? <ReactPlayer url= {this.props.skill.url} 
                            controls = {true} 
                            alt = {this.props.skill.description} 
                            light = {true}
                            className = {classes.video}/>
                        :<TextField></TextField>}
                    </Paper>
               </Grid>
               <Grid item xs = {12} sm = {6} md = {8} minHeight = '300px'> 
                    <Paper className = {classes.paper}>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        minHeight = '235px'
                        spacing = {1}>
                           <Grid item xs = {4}>
                                 {!this.state.edit ?
                                   <>
                                    <h3>{this.props.skill.title}</h3>
                                    <p>Catagories:
                                        a lot of
                                        catagories
                                        will go here
                                        {/* {JSON.stringify(this.props.reduxState.category)} */}
                                        {this.state.catagories.map((catagory, i) =>(
                                            {catagory}
                                         ))}
                                    </p>
                                  </>
                                 :
                                 <p>   
                                    lorem impsemskldfjslk
                                    gsfklgj
                                    sgmkl;
                                    jksfldgj'
                                    jklgfsdgjsklfop
                                </p>}
                            </Grid>
                            <Grid item xs = {4}>
                            {!this.state.edit ?
                            <p>{this.props.skill.description}</p>
                            :
                                <p>
                            lorem impsemskldfjslk
                            gsfklgj
                            sgmkl;
                            jksfldgj'
                            jklgfsdgjsklfop
                             </p>
                            }
                            </Grid>
                            <Grid item xs = {4}>
                                {!this.state.edit? 
                                <>
                                    <Button variant = 'contained'>
                                        Edit
                                    </Button>
                                    <br/>
                                    <br/>
                                    <Button variant = 'contained'>
                                        Delete
                                    </Button>
                                </>
                                :
                                <p>
                            lorem impsemskldfjslk
                            gsfklgj
                            sgmkl;
                            jksfldgj'
                            jklgfsdgjsklfop
                             </p>
                             }
                            </Grid>
                        </Grid>    
                    </Paper>
               </Grid>
          </Grid>
      </div>
    );
  }
}

EditSkillItem.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(EditSkillItem));