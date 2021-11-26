const pool = require('../models/db');

const getMachines = (req, res) => {
  pool.connect( (err, client, release) => {
    if(err) { return console.error('Error acquiring client', err.stack) }
    client.query('SELECT * FROM machines ORDER BY id ASC', (err, result) => {
      release();
      if (err) { return console.error('Error executing query', err.stack) }
      res.status(200).json(result.rows)
    });
  });  
}

const createMachine = (req, res) => {
  const { name, type } = req.body

  pool.connect( (err, client, release) => {
    if(err) { return console.error('Error acquiring client', err.stack) }
    client.query('INSERT INTO machines (name, type) VALUES ($1, $2)', [name, type], (err, result) => {
      release();
      if (err) { return console.error('Error executing query', err.stack) }
      res.status(201).send(`Machine added with ID: ${result.insertId}`)
    });
  });
}

const updateMachine = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, type } = req.body

  pool.connect( (err, client, release) => {
    if(err) { return console.error('Error acquiring client', err.stack) }
    client.query('UPDATE machines SET name = $1, type = $2 WHERE id = $3', [name, type, id], (err, result) => {
      release();
      if (err) { return console.error('Error executing query', err.stack) }
      res.status(200).send(`Machine modified with ID: ${id}`)
    });
  });  
}

const deleteMachine = (req, res) => {
  const id = parseInt(req.params.id)

  pool.connect( (err, client, release) => {
    if(err) { return console.error('Error acquiring client', err.stack) }
    client.query('DELETE FROM machines WHERE id = $1', [id], (err, result) => {
      release();
      if (err) { return console.error('Error executing query', err.stack) }
      res.status(200).send(`Machine deleted with ID: ${id}`)
    });   
  });
}

module.exports = {
  getMachines,
  createMachine,
  updateMachine,
  deleteMachine
}