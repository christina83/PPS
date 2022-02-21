const express = require('express');
const router = express.Router();
const { Order, getAllOrders } = require('../models/Order');

router.get('/', async (req, res) => {
  const result = await getAllOrders();
  res.render('pages/orders', {
    orders: result.rows
  });
});

router.post('/', async (req, res) => {
  const { customer, task, temperature, material } = req.body
  try {
    let order = new Order({ customer, task, temperature, material });
    order = await order.createOrder();
    res.redirect('/orders');
  } catch (error) {
      throw(error);
  }
});

module.exports = router;