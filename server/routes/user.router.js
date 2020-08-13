const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const { rejectNonCoach } = require('../modules/authorization-coach');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

//get ALL user data from database (except password info)
router.get('/all', rejectNonCoach, (req,res) => {
   const queryText = `SELECT "id", "username", "email", "bio", "goals"  FROM "user";`;
   pool.query(queryText)
   .then((result)=>{res.send(result.rows)})
   .catch((error)=>{
     res.sendStatus(500)
     console.log(error);
   })
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const email = req.body.email;
  const is_coach = req.body.is_coach;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password, email, is_coach) 
  VALUES ($1, $2, $3, $4) RETURNING id;`;
  pool.query(queryText, [username, password, email, is_coach])
    .then(() => res.sendStatus(201))
    .catch((error) => {res.sendStatus(500);
    // console.log(error)
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

//update a user's saved email address
router.put('/email', rejectUnauthenticated, (req,res)=>{
  const email = req.body.email;
  const id = req.body.id;
  const queryText = `UPDATE "user"
  SET "email" = $1 
  WHERE "id" = $2`
  pool.query(queryText, [ email, id])
  .then(() => res.sendStatus(201))
  .catch((error) => {res.sendStatus(500);
   console.log(error)
  });
})

//update a user's bio
router.put('/bio', rejectUnauthenticated, (req,res)=>{
  const bio = req.body.bio;
  const id = req.body.id;
  const queryText = `UPDATE "user"
  SET "bio" = $1 
  WHERE "id" = $2`
  pool.query(queryText, [bio, id])
  .then(() => res.sendStatus(201))
  .catch((error) => {res.sendStatus(500);
   console.log(error)
  });
})

//update a user's goals
router.put('/goals', rejectUnauthenticated, (req,res)=>{
  const goals = req.body.goals;
  const id = req.body.id;
  const queryText = `UPDATE "user"
  SET "goals" = $1 
  WHERE "id" = $2`
  pool.query(queryText, [goals, id])
  .then(() => res.sendStatus(201))
  .catch((error) => {res.sendStatus(500);
   console.log(error)
  });
})

module.exports = router;
