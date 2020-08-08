import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { Toolbar, AppBar, } from '@material-ui/core';


const Nav = (props) => (
  <div className="nav">
    <AppBar position = 'static'>
      <Toolbar>
        <Link className = 'nav-link' to="/home">
           <b>Jammer Coach</b> 
        </Link>
        <img className = "icon" src = {require ('./favicon.ico') }alt = 'roller skate icon'/>
        <div className="nav-right">
          <Link className="nav-link" to="/home">
            {/* Show this link if they are logged in or not,
            but call this link 'Home' if they are logged in,
            and call this link 'Login / Register' if they are not */}
            {props.user.id ? 'Home' : 'Login / Register'}
          </Link>
          {/* Show the link to the info page and the logout button if the user is logged in */}
          {props.user.id && (
            <>
              <Link className="nav-link" to="/info">
                Info Page
              </Link>
              <Link className="nav-link" to="/AddSkill">
                Add a Skill
              </Link>
              <Link className="nav-link" to="/curriculum">
                My Curriculum
              </Link>
            </>    
          )}
            {props.user.is_coach && (
           <>
             <Link className="nav-link" to="/AssignList">
             Assign Skills
           </Link>
           <Link className="nav-link" to="/manage">
             Manage Skaters
           </Link>
           <Link className="nav-link" to="/EditSkill">
             Edit Skills
           </Link>
         </>
          )}
          {/* Always show this link since the about page is not protected */}
          <Link className="nav-link" to="/about">
            About
          </Link>
        </div>
        <div className = 'nav-end'>
        <LogOutButton className="nav-link"/>
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
