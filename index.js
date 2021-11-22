const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const main = require('./routes/main');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/', main);

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;