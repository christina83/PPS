const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const machines = require('./routes/machines');
const orders = require('./routes/orders');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/machines', machines);
app.use('/orders', orders);

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;