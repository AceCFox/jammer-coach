const rejectNonCoach = (req, res, next) => {
    // check if logged in
    if (req.isAuthenticated() && req.user.is_coach ) {
      // They were authenticated! User may do the next thing
      // they are also a coach!
      next();
    } else {
      // failure best handled on the server. do redirect here.
      res.sendStatus(403);
    }
  };
  
  
  module.exports = { rejectNonCoach };
  