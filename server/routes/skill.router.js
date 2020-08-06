const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


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

//this post route uses postgreSql transactions to allow a simultaneous
//insert into the skill title and a new row for each of the categories
//inserted in to the category_skill table
router.post('/', rejectUnauthenticated, async (req, res) =>  {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const queryText = `INSERT INTO "skill"("title", "url", "author", "description") 
     VALUES($1, $2, $3, $4) RETURNING "id";`
    const res = await client.query(queryText, [req.body.title,
         req.body.url,
         req.body.author,
         req.body.description])
    const insertText = `INSERT INTO "skill_category" ("skill_id", "category_id")
              VALUES($1 , $2);`
    for (let i =0; i<req.body.categories.length; i++ ){
      await client.query(insertText, [res.rows[0].id, req.body.categories[i].id])
    }
    await client.query('COMMIT')
   // res.sendStatus(201)
  } catch (error) {
    await client.query('ROLLBACK')
    console.log(error)
    res.sendStatus(500);
  } finally {
    client.release()
  }
})

/**
 * UPDATE a skill by 
 */
router.put('/', rejectUnauthenticated, (req, res) => {
  const queryText = 
  `UPDATE "skill"
  SET "title" = $1,
    "url" = $2,
    "author" = $3,
    "description" = $4
  WHERE "id" = $5;`;
  const queryInput = [
    req.body.title,
    req.body.url,
    req.body.author,
    req.body.description,
    req.body.id,
  ];
  pool.query(queryText, queryInput)
  .then(() => res.sendStatus(201))
  .catch((error) => {res.sendStatus(500);
    console.log(error);
    console.log(req.body)
  });
});


module.exports = router;