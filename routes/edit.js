// Endpoint to manage editing the orders
const express = require('express');
const router = express.Router();

router.get('/:id/edit', async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await poolConnection.query('SELECT * FROM orders WHERE id = $1', [id]);
    res.render('pages/edit', {
      order: result.rows[0]
    });
  });

  // Redirect zu orders zurück (browser macht automatisch ein GET und holt die orders)
  router.put('/:id/update', async (req, res) => {
    const id = parseInt(req.params.id)
    const { customer, task, temperature, material } = req.body
    const result = await poolConnection.query('UPDATE orders SET customer = $1, task = $2, temperature = $3, material = $4 WHERE id = $5', [customer, task, temperature, material, id]);
    res.redirect('/orders');
  });


  module.exports = router;