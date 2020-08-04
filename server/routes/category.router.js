const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = 'GET * FROM "category"';
    pool.query(queryText)
      .then(() => res.send(result.rows))
      .catch((error) => {res.sendStatus(500);
      // console.log(error)
      });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;