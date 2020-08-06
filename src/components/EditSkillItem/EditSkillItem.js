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
        maxHeight: '225px',
    },
    formControl: {
        minWidth: 200,
    },
    longField:{
        width: '85%',
    },
    smallList:{
        margins: '2px',
        padding: '1px',
        listStyle:'none',
    }
  });

class EditSkillItem extends Component {
    state = {
        edit: false,
        categories: []
    }

    componentDidMount(){
       // dispatching a saga to get all the skill_catagory   
      this.setCatagories();
    }
    
    setCatagories = () =>{
      let array = [];
      let junction = this.props.reduxState.skillCategory;
      const id =this.props.skill.id;
      for (let i =0; i<junction.length; i++){
          if (junction[i].skill_id == id){
              array.push(junction[i])
          }//end if
      }//end for
     console.log(array)
     this.setState({
         ...this.state,
         categories: array,
     })
    }//end setCatagories

    handleEditTrue = () =>{
        this.setState({
            ...this.state,
            edit: true,
        })
    }
    
    handleEditFalse = () =>{
        this.setState({
            ...this.state,
            edit: false,
        })
    }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
         <Paper className = {classes.paper}> 
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                spacing = {2}> 
                    <Grid item xs = {12} sm = {6} md = {4}>
                       {!this.state.edit ? <ReactPlayer url= {this.props.skill.url} 
                            controls = {true} 
                            alt = {this.props.skill.description} 
                            light = {true}
                            className = {classes.video}/>
                        :<TextField></TextField>}  
                    </Grid>
                    <Grid item xs = {12} sm = {6} md = {8}> 
                        <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing = {1}>
                           <Grid item xs = {4}>
                                 {!this.state.edit ?
                                   <div>
                                    <h3>{this.props.skill.title}</h3>
                                    <p>{this.props.skill.description}</p>
                                  </div>
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
                            <ul className = {classes.smallList}>
                            <label>Categories:</label>  
                              {this.state.categories.map((category, i) =>(
                                 <li key = {i}>{category.name}</li> 
                               ))}
                            </ul> 
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
                                    <Button variant = 'contained'
                                        onClick = {this.handleEditTrue}>
                                        Edit
                                    </Button>
                                    <br/>
                                    <br/>
                                    <Button variant = 'contained'>
                                        Delete
                                    </Button>
                                </>
                                :
                                <div>
                                    <Button>
                                        Save Changes
                                    </Button>
                                    <br/>
                                    <br/>
                                    <Button onClick = {this.handleEditFalse}>
                                        Discard Changes
                                    </Button>
                                </div>
                             }
                            </Grid>
                        </Grid>    
                    </Grid>
                </Grid>
             </Paper>
          <br/>
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