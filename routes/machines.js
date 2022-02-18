// Endpoint to manage the machines
const express = require('express');
const router = express.Router();
const Machine = require('../models/Machine');

// Diese get Abfrage sollte nicht auch noch die Ausgabe manipulieren, sondern nur rendern
router.get('/', async (req, res) => {
  const result = await poolConnection.query('SELECT * FROM machines ORDER BY id ASC');
  res.render('pages/machines', {
    machines: result.rows
  });
});

router.post('/', async (req, res, next) => {
  const { name, type } = req.body
  try {
    const machine = new Machine({ name, type });
    const result = await machine.createMachine();
    res.send(result);
  } catch (error) {
    next(error);
  }  
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const { name, type } = req.body
  const result = await poolConnection.query('UPDATE machines SET name = $1, type = $2 WHERE id = $3', [name, type, id]);
  res.send(result);
});


module.exports = router;