const express = require('express');
const router = express.Router();
const { 
  Order_assignment, 
  get_all_machine_ids, 
  aggregate_wip_orders: aggregate_wip_orders,
  aggregate_scheduled_orders: aggregate_scheduled_orders
} = require('../models/Order_assignment');
const { getAllMachines } = require('../models/Machine');
const { getAllOrders } = require('../models/Order');

// In diesem Router geht es nur um die Ausgabe
router.get('/', async (req, res) => {    
    const machine_ids = await get_all_machine_ids(); // undefined
    let outer_map = new Map();
    for (let i=0; i<machine_ids.length; i++) {
      let temp_map = new Map();
      await aggregate_wip_orders(machine_ids[i], temp_map); // Eine Map
      await aggregate_scheduled_orders(machine_ids[i], temp_map); // Zweite Map
      // Die aggregieren auf die machine_id
      outer_map.set(machine_ids[i], temp_map);
    }
    console.log(outer_map);

    const machines = await getAllMachines(); 
    const orders = await getAllOrders();
    res.render('pages/order_assignments', {
        machine2jobs: outer_map,
        dropdown_machines: machines.rows,
        dropdown_orders: orders.rows
    });
});

router.post('/', async (req, res) => {
  const { machine_id, order_id, state } = req.body
  try {
    let order_assignment = new Order_assignment({ machine_id, order_id, state });
    order_assignment = await order_assignment.create_order_assignment();
    res.redirect('/order_assignments');
  } catch (error) {
      throw(error);
  }
});


module.exports = router;