const express = require('express');
const router = express.Router();
const { 
  Order_assignment, 
  get_all_machine_ids, 
  aggregate_orders: aggregate_orders,
  aggregate_scheduled_orders: aggregate_scheduled_orders
} = require('../models/Order_assignment');
const { getAllMachines } = require('../models/Machine');
const { getAllOrders } = require('../models/Order');

// Hier nicht get_all_assignments anwenden, weil ich nicht das ganze Internet in meine App laden will
// Stattdessen mittels aggregate_orders_on_machine() nur die holen, die ich für die Ausgabe brauche 
// denn in diesem Router geht es nur um die Ausgabe
router.get('/', async (req, res) => {    
    const machine_ids = await get_all_machine_ids();
    let inner_map = new Map();
    let inner_map_scheduled = new Map();
    let outer_map = new Map();
    for (let i = 0; i < machine_ids.rows.length; i++) {
      inner_map = await aggregate_orders(machine_ids.rows[i].machine_id);
      inner_map_scheduled = await aggregate_scheduled_orders(machine_ids.rows[i].machine_id);
      outer_map.set('wip' + i, inner_map);
      outer_map.set('scheduled' + i, inner_map_scheduled);
      console.log(outer_map);
    }   

    const regex_wip = /wip./;
    const regex_scheduled = /scheduled./;
    let status = 'initial';
    for(let i = 0; i < outer_map.size; i++) { 
      let string1 = 'wip' + i;
      let string2 = 'scheduled' + i;
      console.log('Hier:' + outer_map.get(string1));
      console.log(outer_map.get(string1).match(/wip./)); // Funktioniert nicht, weil ich den Value bekomme, nicht den Key (also eine Map)
      if(outer_map.get(string1).match(regex_wip)) {
        status = 'wip';
      } else if (outer_map.get(string2).match(regex_scheduled)) {
        status = 'scheduled';
      }
      outer_map.get(i).forEach(function(value, key) {
        if (status === 'wip') { 
          console.log('wip');
        } else if (status === 'scheduled') {
          console.log('scheduled');
        }
      });
    }
                                        

    const machines = await getAllMachines(); 
    const orders = await getAllOrders();
    res.render('pages/order_assignments', {
        order_assignments_wip: outer_map,
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