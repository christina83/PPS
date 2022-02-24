const express = require('express');
const router = express.Router();
const { Order_assignment, getAllAssignments } = require('../models/Order_assignment');
const { getAllMachines } = require('../models/Machine');
const { getAllOrders } = require('../models/Order');

router.get('/', async (req, res) => {
    const assignments = await getAllAssignments();
    const machines = await getAllMachines(); 
    const orders = await getAllOrders();
    res.render('pages/order_assignments', {
        order_assignments: assignments.rows,
        dropdown_machines: machines.rows,
        dropdown_orders: orders.rows
    });
});

router.post('/', async (req, res) => {
  const { machine_id, order_id, state } = req.body
  try {
    let order_assignment = new Order_assignment({ machine_id, order_id, state });
    order_assignment = await order_assignment.createOrder_assignment();
    res.redirect('/order_assignments');
  } catch (error) {
      throw(error);
  }
});


module.exports = router;