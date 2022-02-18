// Endpoint to manage the orders
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');


router.get('/', async (req, res) => {
  const result = await poolConnection.query('SELECT * FROM orders ORDER BY id ASC');
  res.render('pages/orders', {
    orders: result.rows
  });
});

router.post('/', async (req, res, next) => {
  const { customer, task, temperature, material } = req.body
  try {
    const order = new Order({ customer, task, temperature, material });
    const result = await order.createOrder();
    res.redirect('/orders');
  } catch (error) {
    next(error);
  }
});


module.exports = router;