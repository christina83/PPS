const bodyParser = require('body-parser');
const machines = require('../routes/machines');
const orders = require('../routes/orders');
const edit = require('../routes/edit');
const methodOverride = require("method-override");



// Middleware Functions: Connect URL with Router
// app.use means that this middleware  will be called for every call to the application
module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/machines', machines);
    app.use('/orders', orders);  
    app.use('/orders', edit);  
    app.use(methodOverride("_method", {
        methods: ["POST", "GET"]
    }));
}