const express = require('express');
const router = express.Router();
const { getMachines, createMachine, updateMachine, deleteMachine } = require('../controllers/machineController');

router.get('/', getMachines);
router.post('/', createMachine);
router.put('/:id', updateMachine);
router.delete('/:id', deleteMachine);

module.exports = router;