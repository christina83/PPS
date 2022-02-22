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



router.post // Hier überlegen, wie ein neues Assignment erstellt werden soll (Dropdown anbieten mit bestehenden Maschinen/Orders)


module.exports = router;