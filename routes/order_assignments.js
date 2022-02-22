const express = require('express');
const router = express.Router();
const { Order_assignment, getAllAssignments } = require('../models/Order_assignment');

router.get('/', async (req, res) => {
  const result = await getAllAssignments();
  res.render('pages/order_assignments', {
    order_assignments: result.rows
  });
});

router.post // Hier überlegen, wie ein neues Assignment erstellt werden soll (Dropdown anbieten mit bestehenden Maschinen/Orders)

module.exports = router;