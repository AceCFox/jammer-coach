const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route to get all the categories, and their relationship to skills
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = 
    `SELECT *
    FROM "category" 
    ORDER BY "name" ASC;`;
    pool.query(queryText)
      .then((result) => {res.send(result.rows)
    //  console.log(result.rows)  
    })    
      .catch((error) => {res.sendStatus(500);
        console.log(error);
      });
});

/**
 * GET route to get all the categories, and their relationship to skills
 */
router.get('/skill', rejectUnauthenticated, (req, res) => {
  const queryText = 
  `SELECT "skill_category"."id", "skill_id", "category_id", "name"
  FROM "skill_category"
  JOIN "category" on "category"."id" = "skill_category"."category_id";`;
  pool.query(queryText)
    .then((result) => {res.send(result.rows)
  //  console.log(result.rows)  
  })    
    .catch((error) => {res.sendStatus(500);
      console.log(error);
    });
});


/**
 * POST route template - leaving this here in case I add a
 * add new category feature but I probably won't because
 * there is not enough common terminology in Derby as of 2020
 */
router.post('/', (req, res) => {

});

module.exports = router;