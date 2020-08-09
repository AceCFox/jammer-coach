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
    WHERE "user_skill"."user_id" = $1
    ORDER BY "skill"."id" ASC;`;
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
router.put('/coachnote', rejectUnauthenticated, (req, res) => {
    const queryString = `UPDATE "user_skill"
    SET "coach_notes" =$1
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
 delete a row from skater_skill
 */
router.delete('/skill', rejectUnauthenticated, (req, res) => {
    const queryString = `DELETE FROM "user_skill"
    WHERE "user_id" = $1 AND "skill_id"= $2;`;
    const postValues = [
        req.body.user_id,
        req.body.skill_id,
    ]
    pool.query(queryString, postValues)
    .then(()=>{res.sendStatus(200)})
    .catch((error)=>{
     res.sendStatus(500)
     console.log(error);
   })
});

module.exports = router;