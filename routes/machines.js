const express = require('express');
const router = express.Router();
const { Machine, getAllMachines } = require('../models/Machine');

router.get('/', async (req, res) => {
  const result = await getAllMachines();
  res.render('pages/machines', {
    machines: result.rows
  });
});

router.post('/', async (req, res) => {
  const { name, type } = req.body
  try {
    const machine = new Machine({ name, type });
    await machine.createMachine();
    res.redirect('/machines');
  } catch (error) {
      throw(error);
  }  
});


module.exports = router;