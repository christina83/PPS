const bodyParser = require('body-parser');
const machines = require('../routes/machines');
const orders = require('../routes/orders');
const edit_machine = require('../routes/edit_machine');
const edit_order = require('../routes/edit_order');
const order_assignments = require('../routes/order_assignments');
const methodOverride = require("method-override");



// Middleware Functions
// app.use means that this middleware  will be called for every call to the application
module.exports = (app) => {
    app.use(methodOverride("_method")); // Muss vor app.use aufgerufen werden
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/machines', machines);
    app.use('/', machines);
    app.use('/orders', orders);
    app.use('/machines', edit_machine);
    app.use('/orders', edit_order); 
    app.use('/order_assignments', order_assignments);
}