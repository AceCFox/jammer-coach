const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonCoach } = require('../modules/authorization-coach');

/**
 POST new skill to skater curriculum
 */
router.post('/assign', rejectNonCoach, (req, res) => {
    const queryString = `INSERT INTO "user_skill"
    ("user_id", "skill_id", "coach_notes")
    VALUES($1, $2, $3)`
    const postValues = [
        req.body.user_id,
        req.body.skill_id,
        req.body.coach_notes,
    ]
    pool.query(queryString, postValues)
    .then(()=>{res.sendStatus(201)})
    .catch((error)=>{
     res.sendStatus(500)
     console.log(error);
   })
});

/**
 * GET all the skills assigned to a particular skater
 */
router.get('/skill/:id', rejectUnauthenticated, (req, res) => {
    const user_id = [req.params.id];
    const queryText  = 
    `SELECT "user_skill"."id", "user_id", "skill_id", "coach_notes", 
    "skater_notes", "title", "url", "favorite", "author", "description"
    FROM "user_skill"
    JOIN "skill" on "user_skill"."skill_id" = "skill"."id"
    WHERE "user_skill"."user_id" = $1
    ORDER BY "skill"."title" ASC;`;
    pool.query(queryText, user_id)
    .then((result)=>{res.send(result.rows)})
    .catch((error)=>{
     res.sendStatus(500)
     console.log(error);
    })    
});


/**
 update skater_notes
 */
router.put('/skatenote', rejectUnauthenticated, (req, res) => {
    const queryString = `UPDATE "user_skill"
    SET "skater_notes" =$1
    WHERE "skill_id" = $2 AND "user_id"= $3;`;
    const postValues = [
        req.body.notes,
        req.body.skill_id,
        req.body.user_id,
    ]
    pool.query(queryString, postValues)
    .then(()=>{res.sendStatus(201)})
    .catch((error)=>{
     res.sendStatus(500)
     console.log(error);
   })
});

/**
 update coach_notes
 */
router.put('/coachnote', rejectNonCoach, (req, res) => {
    const queryString = `UPDATE "user_skill"
    SET "coach_notes" = $1
    WHERE "skill_id" = $2 AND "user_id"= $3;`;
    const postValues = [
        req.body.data.notes,
        req.body.data.skill_id,
        req.body.data.user_id,
    ]
    //console.log('in/api/skater.coachnote with', req.body)
    pool.query(queryString, postValues)
    .then(()=>{res.sendStatus(201)})
    .catch((error)=>{
     res.sendStatus(500)
     console.log(error);
   })
});

/**
 delete a row from skater_skill
 */
router.delete('/skill/:id', rejectNonCoach, async (req, res) => {
    const client = await pool.connect()
    const queryText = `
    DELETE FROM "user_footage"
    WHERE "user_skill_id" = $1;`
    const query2 = `DELETE FROM "user_skill" 
    WHERE "id" = $1;`;
    try{
      await client.query('BEGIN')
      await client.query(queryText, [req.params.id])
      await client.query (query2, [req.params.id])
      await client.query('COMMIT')
      res.sendStatus(201)
    } catch (error) {
      await client.query('ROLLBACK')
      console.log(error)
      res.sendStatus(500);
    } finally {
      client.release()
    }  
});

module.exports = router;