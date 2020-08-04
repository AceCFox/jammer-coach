const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET all skills
 */
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "skill";';
    pool.query(queryText)
      .then((result) => {res.send(result.rows)
     // console.log(result.rows)  
    })    
      .catch((error) => {res.sendStatus(500);
       // console.log(error);
      });
});

/**
 * GET skills of a specific category (by category id)
 */
router.get('/category:id', (req, res) => {
    const queryText = `SELECT * FROM "skill" 
    JOIN skill_category  on skill.id = skill_category.skill_id
    WHERE skill_category.category_id = $1;`
    pool.query(queryText, [req.params.id])
    .then((result) => {res.send(result.rows)
   // console.log(result.rows)  
  })    
    .catch((error) => {res.sendStatus(500);
      console.log(error);
    });

});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;