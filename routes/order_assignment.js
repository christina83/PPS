// Endpoint to manage the order assignments
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  //const result = await poolConnection.query('SELECT * FROM order_assigment ORDER BY id ASC');
  /* res.render('pages/order_assignment', {
    orders: result.rows
  }); */
});

router.post('/', async (req, res) => {
  //const { customer, task, temperature, material } = req.body
  //const result = await poolConnection.query('INSERT INTO orders (customer, task, temperature, material) VALUES ($1, $2, $3, $4)', [customer, task, temperature, material]);
});


module.exports = router;