// Editing the machines
const express = require('express');
const router = express.Router();
const { Machine } = require('../models/Machine');

router.get('/:id/edit', async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await poolConnection.query('SELECT * FROM machines WHERE id = $1', [id]);
    res.render('pages/edit_machine', {
      machine: result.rows[0]
    });
  });

  router.put('/:id/update', async (req, res) => {
    const id = parseInt(req.params.id)
    const { name, type } = req.body
    try {
      const machine = new Machine({ name, type });
      await machine.updateMachine(id);
      res.redirect('/machines');
    } catch (error) {
        throw(error);
    }
  });


  module.exports = router;