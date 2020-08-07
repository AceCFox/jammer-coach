const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 POST new skill to skater curriculum
 */
router.post('/assign', rejectUnauthenticated, (req, res) => {
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
    const queryText  = `SELECT * FROM "user_skill"
    JOIN "skill" on "user_skill"."skill_id" = "skill"."id"
    WHERE "user_skill"."user_id" = $1; `
    pool.query(queryText, user_id)
    .then((result)=>{res.send(result.rows)})
    .catch((error)=>{
     res.sendStatus(500)
     console.log(error);
    })    
});

module.exports = router;