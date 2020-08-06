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
        minWidth: 100,
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
        categories: [],
        title:'',
        author:'',
        url:'',
        description:'',
        thisCategory:'',
    }

    componentDidMount(){
       // dispatching a saga to get all the skill_catagory   
      this.setCatagories();
      const skill = this.props.skill;
      this.setState({
          ...this.state.categories,
          title: skill.title,
          author:skill.author,
          url: skill.url,
          description: skill.description,
      })
    }
    
    setCatagories = () =>{
      let array = [];
      let junction = this.props.reduxState.skillCategory;
      const id =this.props.skill.id;
      for (let i =0; i<junction.length; i++){
          if (junction[i].skill_id === id){
              array.push(junction[i])
          }//end if
      }//end for
     console.log(array)
     this.setState({
         ...this.state,
         categories: array,
     })
    }//end setCatagories

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };

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

    handleSubmit = () =>{
        //dispatch Saga to make UPDATE call
        this.setState({
            ...this.state,
            edit: false,
        })
    }

    handleAdd = () =>{

    }
 
    handleRemove = () =>{

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
                        :
                        <div>
                            <TextField
                                id="title-in"
                                label="Title"
                                name='title'
                                value = {this.state.title}
                                onChange = {this.handleChange}
                                className={classes.textField}
                                margin="normal"/>
                            <br/>
                            <TextField
                                id="url-in"
                                label="Url"
                                multiline
                                rowsMax="3"
                                name='url'
                                value = {this.state.url}
                                onChange = {this.handleChange}
                                className={classes.longField}
                                margin="normal"/>
                            <br/>
                            <TextField
                                id="author-in"
                                label="Creator"
                                name='author'
                                value = {this.state.author}
                                onChange = {this.handleChange}
                                className={classes.textField}
                                margin="normal"/>  
                        </div>
                        }  
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
                                 <>   
                                <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-simple">Category</InputLabel>
                                {/* TO DO: CONTROLL ALL THESE INPUTS */}
                                <Select
                                    value = {this.state.category}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'category',
                                        id: 'category-in',  
                                    }}>
                                        <MenuItem value="">
                                        <em></em>
                                        </MenuItem>
                                        {/* TO DO: CHANGE this.state.allcategory to the category reducer props */}
                                        {this.props.reduxState.category.map((category) =>(
                                            <MenuItem value={category} key ={category.id}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                    <Button color = "primary" onClick = {this.handleAdd}>Add category</Button>
                                </FormControl>
                                <ul className = {classes.smallList} >
                                    {this.state.categories.map((category, index)=>(
                                    <li key = {category.id}>{category.name} 
                                    <Button value = {category.id} color="secondary" onClick = {this.handleRemove(index)}>
                                        Remove
                                        </Button></li> 
                                    ))}
                                </ul>
                                </>}
                            </Grid>
                            <Grid item xs = {4}>
                            {!this.state.edit ?
                            <div>
                            <p>Trainer: {this.props.skill.author}</p>
                            <ul className = {classes.smallList}>
                            <label>Categories:</label>  
                                {/* {JSON.stringify(this.state)} */}
                              {this.state.categories.map((category, i) =>(
                                 <li key = {i}>{category.name}</li> 
                               ))}
                            </ul> 
                            </div>
                            :
                            <TextField
                                id="standard-multiline-flexible"
                                label="Description"
                                name ='description'
                                value = {this.state.description}
                                onChange = {this.handleChange}
                                multiline
                                rowsMax="6"
                                className={classes.longField}
                                margin="normal"
                            />
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
                                    <Button variant = 'contained' onClick = {this.handleSave}>
                                        Save Changes
                                    </Button>
                                    <br/>
                                    <br/>
                                    <Button variant = 'contained' onClick = {this.handleEditFalse}>
                                        Exit without saving
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