import React, {Component} from 'react';
import {Button, Paper, TextField, InputLabel, MenuItem, Select, FormControl, Grid, Dialog, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/lazy';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import FastRewindIcon from '@material-ui/icons/FastRewind';

const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        justify: 'center'
    },
    paper: {
        width: '100%' ,
        padding: theme.spacing(1),
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
        title:'',
        author:'',
        url: '',
        description:'',
        thisCategory:'',
        viewCategories: [],
        addCategories: [],
        deleteCategories: [],
        open: false,
    }

    componentDidMount(){
       // dispatching a saga to get all the skill_catagory   
      this.setCatagories();
      const skill = this.props.skill;
      this.setState({
          ...this.state.categories,
          title: skill.title,
          author: skill.author,
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
              array.push({
                  id: junction[i].category_id,
                  name: junction[i].name   
                })
          }//end if
      }//end for
    // console.log(array)
     this.setState({
         ...this.state,
         viewCategories:array,
     })
    }//end setCatagories

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };

    //set component to edit mode
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

    //create objects for posting and deleting skill_categories
    //and dispatch sagas to make the server calls
    handleSave = () =>{
        const addObject = {
            categories: this.state.addCategories,
            id: this.props.skill.id
        };
        const deleteObject = {
            categories: this.state.deleteCategories,
            id: this.props.skill.id,};
        const updateObject = {
            title: this.state.title,
            url: this.state.url,
            author: this.state.author,
            description: this.state.description,
            id: this.props.skill.id,
        }
        console.log('deleting:', deleteObject,
         'adding:', addObject, 
         'updating:', updateObject );

        //dispatch Saga to make UPDATE call
        this.props.dispatch({type: 'UPDATE_SKILL', payload: updateObject});
        //dispatch POST to skill_category if addCategories is truthy
        if(addObject){
        this.props.dispatch({type:'POST_JUNCTION', payload:addObject});
        }
        //dispatch DELETE from skill_category if deleteCategories is truthy
        if(deleteObject){
        this.props.dispatch({type:'DELETE_JUNCTION', payload: deleteObject})
        }
        //dispatch the GET skill_category saga to show changes
        this.props.dispatch({type:'GET_JUNCTION'});
        //"flip" the card
        this.setState({
            ...this.state,
            edit: false,
        })
    }

    //this function both displays a category and adds it to the add array if it's 
    //not alreay part of the add or view arrays, we will POST the add aray on submit
    handleAdd = () =>{
        const newCat = this.state.thisCategory;
        const viewArray = this.state.viewCategories;
        const addArray = this.state.addCategories;
        let notView = true
        let notAdd = true
        //check if it's already viewed on the DOM, (view Array)
        //if it's not in the viewCategories array, add it to that so it displays
        //console.log(viewArray)
        for (let i=0; i<viewArray.length; i++){
            if (viewArray[i].id ===newCat.id)
               {
                notView = false;
            }
        }
        if (notView&&newCat){viewArray.push(newCat)}
        //check if it's already set up to be added (add Array)
        //if it's not in the view array or add array, add it to the add array
        for (let i=0; i<addArray.length; i++){
            if (addArray[i].id === newCat.id){
              //  console.log('match found')
                notAdd = false;
            }
        }
        if (newCat&&notView&notAdd){addArray.push(newCat)}
        //set state to reflect changes
        this.setState({
            ...this.state,
            viewCategories: viewArray,
            addCategories: addArray,
            thisCategory:'',
        })
       // console.log(addArray);
    }
 
    //handleRemove will remove a category from the dom and set it up
    //to be deleted from skill_catagory on save, or removed from the
    //add array if it was set to be posted on save
    handleRemove = (thisCat) =>(event) =>{
       // console.log(thisCat);
        const viewArray = this.state.viewCategories;
        const addArray = this.state.addCategories;
        const deleteArray = this.state.deleteCategories;
        let inAdd = false
        //remove it from viewCategories so it doesn't display
        for (let i=0; i<viewArray.length; i++){
            if (viewArray[i]===thisCat){
                viewArray.splice(i, 1)
            }
        }
        //if it is in the add array, remove it
        for (let i=0; i<addArray.length; i++){
            if (addArray[i] ===thisCat){
                addArray.splice(i, 1)
                inAdd = true;
            }
        }
        //if it is not in the add array, add it to the delete array
        if(!inAdd){deleteArray.push(thisCat)};
        //setState to 'save changes'
        this.setState({
            ...this.state,
            deleteCategories: deleteArray,
            addCategories: addArray,
            viewCategories: viewArray,
        })
    } 
    
    handleClickOpen = () => {
        this.setState({ ...this.state, open: true });
      };
    
    handleClose = () => {
        this.setState({ ...this.state, open: false });
      };

    handleDelete = () =>{
        let id = this.props.skill.id;
        console.log('deleting skill #', id);
        //dispatch saga to run a delete call
        this.props.dispatch({type: 'DELETE_SKILL', payload: id});
        this.handleClose();
    }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
         <Grid container direction = 'row'
                justify = 'center'
                alignContent = 'center'>
            <Grid item xs = {12} lg = {11} xl = {10}>
                <Paper className = {classes.paper}> 
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing = {1}> 
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
                                            <TextField
                                                id="author-in"
                                                label="Creator"
                                                name='author'
                                                value = {this.state.author}
                                                onChange = {this.handleChange}
                                                className={classes.textField}
                                                margin="normal"
                                                />  
                                            <TextField
                                                label="Description"
                                                name ='description'
                                                value = {this.state.description}
                                                onChange = {this.handleChange}
                                                multiline
                                                rowsMax="6"
                                                className={classes.longField}
                                                margin="normal"
                                            />
                                        </>
                                        }
                                    </Grid>
                                    <Grid item xs = {4}>
                                    {!this.state.edit ?
                                    <div>
                                    <p>Trainer: {this.props.skill.author}</p>
                                    <ul className = {classes.smallList}>
                                    <label>Categories:</label>  
                                        {/* {JSON.stringify(this.state)} */}
                                    {this.state.viewCategories.map((category, i) =>(
                                        <li key = {i}>{category.name}</li> 
                                    ))}
                                    </ul> 
                                    </div>
                                    :
                                    <>  
                                        <FormControl className={classes.formControl}>
                                            <InputLabel>Category</InputLabel>
                                            {/* input controlled to state.thisCategory */}
                                            <Select
                                                value = {this.state.thisCategory}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'thisCategory',
                                                    id: 'category-in',  
                                                }}>
                                                <MenuItem value="">
                                                <em></em>
                                                </MenuItem>
                                                {/* populated from the category reducer props */}
                                                {this.props.reduxState.category.map((category) =>(
                                                    <MenuItem value={category} key ={category.id}>
                                                        {category.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <Button color = "primary" onClick = {this.handleAdd}>Add</Button>
                                        </FormControl>
                                        <ul className = {classes.smallList} >
                                            {this.state.viewCategories.map((category, index)=>(
                                            <li key = {category.id}>
                                                {category.name} 
                                                <Button value = {category.id} color="secondary" 
                                                    onClick = {this.handleRemove(category)}>
                                                    <DeleteIcon/>
                                                </Button>
                                            </li> 
                                            ))}
                                        </ul>
                                    </>}
                                    </Grid>
                                    <Grid item xs = {4}>
                                        {!this.state.edit? 
                                        <>
                                            <Button variant = 'contained' color = 'primary'
                                                onClick = {this.handleEditTrue}>
                                                <EditIcon/> Edit
                                            </Button>
                                            <br/>
                                            <br/>
                                            <Button variant = 'contained' color = 'secondary'
                                                onClick = {this.handleClickOpen}>
                                                <DeleteIcon/> Delete
                                            </Button>
                                        </>
                                        :
                                        <div>
                                            <Button variant = 'contained' onClick = {this.handleSave}
                                                color= 'primary'>
                                            <SaveAltIcon/> Save Changes
                                            </Button>
                                            <br/>
                                            <br/>
                                            <Button variant = 'contained' onClick = {this.handleEditFalse}
                                                color = 'secondary'>
                                                <CloseIcon/> Exit without saving
                                            </Button>
                                        </div>
                                    }
                                    </Grid>
                                </Grid>    
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
             </Grid>
          <br/>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}>
              <DialogContent>
                  <DialogContentText>
                     Are you certain you want to permanently delete {this.props.skill.title} from the database?
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant = "outlined" color = "primary" onClick = {this.handleClose}>
                    <FastRewindIcon/> Oops, NO
                </Button>
                <Button variant = "outlined" color = "secondary" onClick = {this.handleDelete}>
                    <DeleteIcon/> YES, delete permanently
                </Button>
              </DialogActions>
          </Dialog>
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