import React from 'react';
import './Footer.css'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid'
// import TwitterIcon from '@material-ui/icons/Twitter';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <footer>
    <Grid container>
    <PhotoCameraIcon/> <i>by Ron Wilbur, and Workhorse Photography </i>
    </Grid>
  </footer>
);

export default Footer;
