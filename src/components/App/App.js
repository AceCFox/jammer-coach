import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CoachRoute from '../CoachRoute/CoachRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import AddSkill from '../AddSkill/AddSkill';
import AssignList from '../AssignList/AssignList';
import './App.css';
import EditSkill from '../EditSkill/EditSkill';
import Curriculum  from '../Curriculum/Curriculum';
import ManageSkater from '../ManageSkater/ManageSkater';
import AddSelfFootage from '../AddSelfFootage/AddSelfFootage'
import { CssBaseline, MuiThemeProvider, createMuiTheme, } from '@material-ui/core';
import Landing from '../Landing/Landing';
import SportsIcon from '@material-ui/icons/Sports';
import { blue, deepOrange, green,} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette:{
    primary: blue,
    secondary: deepOrange,
    success: green, 
  },
  overrides: {
    Snackbar: {
      backgroundColor: green,
    }
  }
})

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
    console.log(theme);
  }

  render() {
    return (
      <MuiThemeProvider theme = {theme}>
      <Router>
        <CssBaseline/>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={Landing}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/profile"
              component={UserPage}
            />
            <ProtectedRoute
              exact
              path="/addSkill"
              component={AddSkill}
            />
            {/* Only coaches can assign and edit skills */}
            <CoachRoute 
              path = "/AssignList"
              component = {AssignList}
              />
              <CoachRoute 
              path = "/EditSkill"
              component = {EditSkill}
              />
              <ProtectedRoute 
              path = "/curriculum"
              component = {Curriculum}
              />
              {/* Only coaches can manage skater curriculi */}
               <CoachRoute 
              path = "/manage"
              component = {ManageSkater}
              />
              <ProtectedRoute 
              path = "/footage"
              component = {AddSelfFootage}
              />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() =>
              <center>
                <h1> 404 </h1>        
                  <h2> <SportsIcon/> <Link to='/home'>   Skater, return to track! </Link></h2>   
              </center>} />
          </Switch>
          <Footer />
        </div>
      </Router>
      </MuiThemeProvider>
  )}
}

export default connect()(App);
