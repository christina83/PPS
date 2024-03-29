// Editing the orders
const express = require('express');
const router = express.Router();
const { Order } = require('../models/Order');

router.get('/:id/edit', async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await poolConnection.query('SELECT * FROM orders WHERE id = $1', [id]);
    res.render('pages/edit_order', {
      order: result.rows[0]
    });
  });

  router.put('/:id/update', async (req, res) => {
    const id = parseInt(req.params.id)
    const { customer, task, temperature, material, state } = req.body
    try {
      const order = new Order({ customer, task, temperature, material, state });
      await order.updateOrder(id);
      res.redirect('/orders');
    } catch (error) {
        throw(error);
    }
  });


  module.exports = router;