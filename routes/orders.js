// Endpoint to manage the orders
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const result = await poolConnection.query('SELECT * FROM orders ORDER BY id ASC');
  res.render('pages/order');
});

router.post('/', async (req, res) => {
  const { customer, task, temperature, material } = req.body
  const result = await poolConnection.query('INSERT INTO orders (customer, task, temperature, material) VALUES ($1, $2, $3, $4)', [customer, task, temperature, material]);
  res.send(result);
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const { customer, task, temperature, material } = req.body
  const result = await poolConnection.query('UPDATE orders SET customer = $1, task = $2, temperature = $3, material = $4 WHERE id = $5', [customer, task, temperature, material, id]);
  res.send(result);
});
  
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const result = await poolConnection.query('DELETE FROM orders WHERE id = $1', [id]);
  res.send(result);
});   


module.exports = router;