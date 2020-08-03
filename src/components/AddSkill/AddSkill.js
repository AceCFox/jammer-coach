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
    newUrl:'',
    urlArray: []};

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
          <Paper className = {classes.paper}>
                <h2>Add A Skill</h2>
                {/* Eventually, this next bit should be conditional upon user != coach */}
                <p><i>Note: these viedeos are accessable by all users</i></p>
                {/* A link to the add self footage page will appear here if the user is not a coach */}
                <TextField
                id="title-in"
                label="Title"
                className={classes.textField}
                margin="normal"/>
                {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                <TextField
                id="author-in"
                label="Author"
                className={classes.textField}
                margin="normal"/>
                <TextField
                id="url-in"
                label="Youtube Url"
                className={classes.longField}
                margin="normal"/>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Category</InputLabel>
                    {/* TO DO: CONTROLL ALL THESE INPUTS */}
                    <Select
                        inputProps={{
                        name: 'category',
                        id: 'category-in',
                        }}>
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value='10'>Ten</MenuItem>
                            <MenuItem value='20'>Twenty</MenuItem>
                            <MenuItem value='30'>Thirty</MenuItem>
                        </Select>
                        <Button color = "primary">Add category</Button>
                    </FormControl>
                    <ul className = {classes.categoryList} >
                        <label>Selected Categories</label>
                        <li>sample category <Button color="secondary">Remove</Button></li>
                        <li>another category <Button color="secondary">Remove</Button></li>
                    </ul>
                <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                rowsMax="4"
                className={classes.longField}
                margin="normal"
                />
                <br/>
                <br/>
            <Button variant ='contained' color = 'primary' size = "large">Submit</Button>
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