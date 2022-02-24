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
  const state = "available";
  try {
    let machine = new Machine({ name, type, state });
    machine = await machine.createMachine();
    res.redirect('/machines');
  } catch (error) {
      throw(error);
  }  
});


module.exports = router;