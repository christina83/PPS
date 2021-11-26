const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const machinesRouter = require('./routes/machines');
const ordersRouter = require('./routes/orders');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/machines', machinesRouter);
app.use('/orders', ordersRouter);

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;

// TODO
// Done: Router und Pool zentral erstellen, statt überall eigene Instanzen (Architekturproblem für DB-Nutzer) > Siehe vidly Anwendung
// Done: getMachines() etc. in neuen Ordner "Controllers" verschieben
// Code in Controllern redundant (persönliches Problem) - Middleware ?
// strict vs. sloppy mode erklären
// views erstellen
