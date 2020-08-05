const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 POST new skill to skater curriculum
 */
router.post('/assign', rejectUnauthenticated, (req, res) => {
    const queryString = `INSERT INTO "user_skill"
    ("user_id", skill_id, "coach_notes")
    VALUES($1, $2, $3)`
    const postValues = [
        req.body.user_id,
        req.body.skill_id,
        req.body.coach_notes,
    ]
    pool.query(queryString, postValues)
    .then((result)=>{res.send(result.rows)})
    .catch((error)=>{
     res.sendStatus(500)
     console.log(error);
   })
});

/**
 * POST route template
 */
router.post('/id', (req, res) => {

});

module.exports = router;