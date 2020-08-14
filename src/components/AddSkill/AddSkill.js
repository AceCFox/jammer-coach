import React, {Component} from 'react';
import {Button, Paper, TextField, Grid, InputLabel, MenuItem, Select, ListSubheader, Divider, } from '@material-ui/core';
import {FormControl, Snackbar, IconButton, List, ListItem, ListItemText,  ListItemIcon} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        justify: 'center',
        backgroundColor: '#2f4353',
        backgroundImage: 'linear-gradient(315deg, #2f4353 0%, #d2ccc4 74%)',
        height: '800px',
    },
    paper: {
        width: '100%',
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        justify: 'center',
    },
    textFeld:{
        width: 200,
    },
    longField:{
        width: '90%',
    },
    categoryList:{
        alignItems: "flex-start",
        allignContent: 'center',
        // border: 'ridge'
    }
  });

class AddSkill extends Component {
  state = {
    title:'',
    author:'',
    url:'',
    description:'',
    thisCategory: [],
    category: '',
    lastTitle: '',
    submitted: false,
    };

    componentDidMount(){
        //dispatch saga to fetch categories
        this.props.dispatch({type: 'GET_CATEGORY'})
    }

    handleChange = (event) => {
        this.setState({ 
            ...this.state,
            [event.target.name]: event.target.value });
      };

    handleAdd = ()=>{
        let array = this.state.thisCategory;
        let newCategory = this.state.category;
        //check if a unique category has been selected
        //skills can have multiple cateogories, but only needs a category once
        if (newCategory !== ''){
            for(let i=0; i<array.length; i++){
                if (array[i] === newCategory){
                    console.log('match found')
                    return;
                }
            }
            array.push(newCategory);
        //sets our state back to empty category input, 
        //and updates our thisCategory array
        this.setState({
            ...this.state,
            thisCategory: array,
            category:'',
        })//end setState
        }   
    }//end handleAdd

    handleRemove = (id) => (event) =>{
        console.log('remove', id);
        let array = this.state.thisCategory;
        array.splice(id, 1);
        this.setState({
            ...this.state,
            thisCategory: array
        })//end setStae
    }//end handleRemove

    handleSubmit = () =>{
        const submitObject = {
            title: this.state.title,
            author: this.state.author,
            url: this.state.url,
            categories: this.state.thisCategory,
            description: this.state.description,
        }
        console.log('object to post:', submitObject);
        //dispatch a saga to post submitObject
        if (submitObject.title&&submitObject.url){
        this.props.dispatch({type: 'POST_SKILL', payload: submitObject})
        }
        //reset state and throw confirm
        this.setState({
            title:'',
            author:'',
            url:'',
            description:'',
            thisCategory: [],
            category: '',
            lastTitle: submitObject.title,
            submitted: true,  
        })
    }

    handelOk = (event, reason) =>{
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
           direction = "column"
           alignItems = "center"
           justify = 'space-between'
           >
            <Grid item xs = {12} md = {10} lg = {8} >
                <Paper className = {classes.paper}>
                    <h1>Add A Skill</h1>
                    {/* Eventually, this next bit should be conditional upon user != coach */}
                    <p><i>Note: skill videos are accessable by all users</i></p>
                    {/* A link to the add self footage page will appear here if the user is not a coach */}
                    <TextField
                    id="title-in"
                    label="*Title"
                    name='title'
                    value = {this.state.title}
                    onChange = {this.handleChange}
                    className={classes.textField}
                    margin="normal"/>
                    {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                    <TextField
                    id="author-in"
                    label="Trainer"
                    name='author'
                    value = {this.state.author}
                    onChange = {this.handleChange}
                    className={classes.textField}
                    margin="normal"/>
                    <TextField
                    id="url-in"
                    label="*Video Url"
                    name='url'
                    value = {this.state.url}
                    onChange = {this.handleChange}
                    className={classes.longField}
                    margin="normal"/>
                    <br/>
                    <br/>
                    <Grid container
                        alignItems = "center"
                        justify = 'center'
                        alignContent = 'center'
                        spacing = {0}
                    >
                        <Grid item xs = {12} sm = {6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-simple">Categories</InputLabel>
                                {/* Inputs all controlled*/}
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
                                    {/* categories populated by reduxState */}
                                    {this.props.reduxState.category.map((category) =>(
                                        <MenuItem value={category} key ={category.id}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                                <Button color = "primary" onClick = {this.handleAdd} variant = 'outlined'>
                                    Add Category
                                </Button>
                            </FormControl>
                        </Grid>
                        {/* {'\u00A0'}{'\u00A0'}{'\u00A0'} */}
                        <Grid item xs = {12} sm = {6} >
                        {this.state.thisCategory.length 
                        ?  
                            <List className = {classes.categoryList}
                            subheader = {<ListSubheader>Selected Categories</ListSubheader>} >
                                {this.state.thisCategory.map((category, index)=>(
                                <div key = {category.id}>
                                    <ListItem>
                                        <ListItemText primary ={category.name} />
                                        {'\u00A0'}
                                        <ListItemIcon button = '' onClick = {this.handleRemove(index)} >
                                            <DeleteIcon color = 'secondary'/>
                                        </ListItemIcon>  
                                    </ListItem> 
                                    <Divider/>
                                </div>
                                ))}
                            </List>
                            :
                                <center>
                                    <i>Click 'add category'</i>{'\u00A0'}
                                    <br/>
                                    <i> to include selected category</i>
                                </center>
                            }
                        </Grid>
                    </Grid>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Description"
                        name ='description'
                        value = {this.state.description}
                        onChange = {this.handleChange}
                        multiline
                        rowsMax="4"
                        className={classes.longField}
                        margin="normal"
                    />
                    <br/>
                    <br/>
                    {(this.state.title&& this.state.url) ?
                        <Button variant ='contained' color = 'primary' size = "large" onClick = {this.handleSubmit}>
                            Submit
                        </Button>
                            :
                        <Button variant ='contained' disabled size = "large">
                            Submit
                        </Button>
                    }
                </Paper> 
            </Grid>
        </Grid>
        {/* This snackbar lets a user know they have submitted a new skill */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.submitted}
          autoHideDuration={6000}
          onClose={this.handelOk}
          variant="success"
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">
                Successfully submitted {this.state.lastTitle}
              </span>}
          action={[
            <IconButton
              color="inherit"
              onClick={this.handelOk}
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

AddSkill.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(AddSkill));