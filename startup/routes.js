const bodyParser = require('body-parser');
const machines = require('../routes/machines');
const orders = require('../routes/orders');
const edit = require('../routes/edit');
const order_assignment = require('../routes/order_assignment');
const methodOverride = require("method-override");



// Middleware Functions
// app.use means that this middleware  will be called for every call to the application
module.exports = (app) => {
    app.use(methodOverride("_method")); // Muss vor app.use aufgerufen werden
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/machines', machines);
    app.use('/orders', orders);
    app.use('/orders', edit); 
    app.use('/order-assignments', order_assignment);
}