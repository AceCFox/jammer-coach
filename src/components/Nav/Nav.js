import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { Toolbar, AppBar, List, ListItem, Drawer, Divider, ListItemIcon, ListItemText, IconButton} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logout: {
    marginLeft: '85%'
  },
  icon:{
    height: 50,
    width: 'auto',
  },
});



class Nav extends Component{
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  render() {
    const {classes} = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <List>
          <ListItem>
            <ListItemIcon>
            <img className = "icon" src = {require ('./favicon.ico') }alt = 'roller skate icon'/>
            </ListItemIcon>
            <ListItemText primary ='JammerCoach'/>
          </ListItem>
        </List>
        
        
        <Divider />
        {this.props.reduxState.user.is_coach && (
          <>
          <List>
            <ListItem button component = {Link} to ="/AssignList" >
              <ListItemText primary ='Assign Skills'/>
            </ListItem>     
            <ListItem button component = {Link} to = '/manage'>
              <ListItemText primary ='Manage Skaters'/>
            </ListItem>     
            <ListItem button component = {Link} to = '/EditSkill'>
              <ListItemText primary ='Edit Skills'/>
            </ListItem>   
          </List>
          <Divider />
        </>
        )}
         {this.props.reduxState.user.id && (
          <>
          <List>
            <ListItem button component = {Link} to ='/home'>
              <ListItemText primary ='Profile'/>
            </ListItem>
            <ListItem button component = {Link} to = '/curriculum'>
              <ListItemText primary ='My Curriculum'/>
            </ListItem>
            <ListItem button component = {Link} to = '/AddSkill'>
              <ListItemText primary ='Add A Skill'/>
            </ListItem>
            <ListItem button component = {Link} to = '/footage'>
              <ListItemText primary ='Add Footage of Myself'/>
            </ListItem>
          </List>
          <Divider />
        </>
        )}
        <List>
          <ListItem >
            <LogOutButton/>
          </ListItem>
        </List>
      </div>
    )
    return (
    <div className="nav">
      <AppBar position = 'static'>
        <Toolbar>
          <IconButton
              color="inherit"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
          </IconButton>
          <h3>Jammer Coach</h3>
          {'\u00A0'}{'\u00A0'}
          <img className = {classes.icon} src = {require ('./favicon.ico') }alt = 'roller skate icon'/>
          
          {/* <LogOutButton /> */}
         
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
            <Drawer
              container={this.props.container}
              anchor="left"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
        </nav>
    </div>
  );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};
// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = reduxState => ({
  reduxState,
});
export default withStyles(styles)(connect(mapStateToProps)(Nav));
