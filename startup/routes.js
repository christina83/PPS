const bodyParser = require('body-parser');
const machines = require('../routes/machines');
const orders = require('../routes/orders');

// Middleware Functions: Connect URL with Router
module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/machines', machines);
    app.use('/orders', orders);    
}