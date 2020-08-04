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
 * POST new skill into skill table
 */
router.post('/', (req, res) => {
  const queryText = `INSERT INTO "skill"("title", "url", "author", "description") 
  VALUES($1, $2, $3, $4); `
  pool.query(queryText, 
    [req.body.title,
    req.body.url,
    req.body.author,
    req.body.description])
  .then(() => res.sendStatus(201))
  .catch((error) => {res.sendStatus(500);
   console.log(error)
  });
});

module.exports = router;