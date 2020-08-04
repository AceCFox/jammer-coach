const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route to get all the categories
 */
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "category" ORDER BY "name" ASC;';
    pool.query(queryText)
      .then((result) => {res.send(result.rows)
     // console.log(result.rows)  
    })    
      .catch((error) => {res.sendStatus(500);
       // console.log(error);
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