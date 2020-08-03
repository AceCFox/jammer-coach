import React, {Component} from 'react';
import {Button, Paper, TextField, InputLabel, MenuItem, Select, FormControl} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';


const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center'
    },
    paper: {
        width: '90%',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textFeld:{
        width: 200,
    },
    longField:{
        width: '85%',
    },
    categoryList:{
        listStyle: 'inside',
    }
  });

class AddSkill extends Component {
  state = {
    title:'',
    author:'',
    url:'',
    description:'',
    thisCategory: [],
    allCategory:['hockey stop', 'plow', 'edges', 'toe stop', 'agility', 'crossover'],
    category: ''
    };

    componentDidMount(){
        //dispatch saga to fetch categories
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };

    handleAdd = (event)=>{
        let array = this.state.thisCategory;
        array.push(this.state.category);
        // console.log(array);
        this.setState({
            ...this.state,
            thisCategory: array,
            category:'',
        })//end setState
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
    }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
          <Paper className = {classes.paper}>
                <h2>Add A Skill</h2>
                {/* Eventually, this next bit should be conditional upon user != coach */}
                <p><i>Note: skill videos are accessable by all users</i></p>
                {/* A link to the add self footage page will appear here if the user is not a coach */}
                <TextField
                id="title-in"
                label="Title"
                name='title'
                value = {this.state.title}
                onChange = {this.handleChange}
                className={classes.textField}
                margin="normal"/>
                {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                <TextField
                id="author-in"
                label="Creator"
                name='author'
                value = {this.state.author}
                onChange = {this.handleChange}
                className={classes.textField}
                margin="normal"/>
                <TextField
                id="url-in"
                label="Youtube Url"
                name='url'
                value = {this.state.url}
                onChange = {this.handleChange}
                className={classes.longField}
                margin="normal"/>
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
                            {this.state.allCategory.map((category, index) =>(
                                <MenuItem value={category} key ={index}>{category}</MenuItem>
                            ))}
                        </Select>
                        <Button color = "primary" onClick = {this.handleAdd}>Add category</Button>
                    </FormControl>
                    <ul className = {classes.categoryList} >
                        <label>Selected Categories</label>
                        {this.state.thisCategory.map((category, index)=>(
                           <li key = {index}>{category} 
                           <Button value = {index} color="secondary" onClick = {this.handleRemove(index)}>
                               Remove
                            </Button></li> 
                        ))}
                    </ul>
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
            <Button variant ='contained' color = 'primary' size = "large" onClick = {this.handleSubmit}>
                Submit
            </Button>
          </Paper> 
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