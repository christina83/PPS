const express = require('express');
const router = express.Router();
const db = require('../queries');

router.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});
  
router.get('/machines', db.getMachines)
router.post('/machines', db.createMachine)
router.put('/machines/:id', db.updateMachine)
router.delete('/machines/:id', db.deleteMachine)

module.exports = router;
