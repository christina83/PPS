const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const machines = require('./routes/machines');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', machines);

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;