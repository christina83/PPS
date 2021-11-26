const pool = require('../models/db');

const getOrders = (req, res) => {
    pool.connect( (err, computerClient, release) => {
      if(err) { return console.error('Error acquiring client', err.stack) }
      computerClient.query('SELECT * FROM orders ORDER BY id ASC', (err, result) => {
        release();
        if (err) { return console.error('Error executing query', err.stack) }
        res.status(200).json(result.rows)
      });
    });  
  }
  
  const createOrder = (req, res) => {
    const { client, task, temperature, material } = req.body
  
    pool.connect( (err, computerClient, release) => {
      if(err) { return console.error('Error acquiring client', err.stack) }
      computerClient.query('INSERT INTO orders (client, task, temperature, material) VALUES ($1, $2, $3, $4)', [client, task, temperature, material], (err, result) => {
        release();
        if (err) { return console.error('Error executing query', err.stack) }
        res.status(201).send(`Order added with ID: ${result.insertId}`)
      });
    });
  }
  
  const updateOrder = (req, res) => {
    const id = parseInt(req.params.id)
    const { client, task, temperature, material } = req.body
  
    pool.connect( (err, computerClient, release) => {
      if(err) { return console.error('Error acquiring client', err.stack) }
      computerClient.query('UPDATE orders SET client = $1, task = $2, temperature = $3, material = $4 WHERE id = $5', [client, task, temperature, material, id], (err, result) => {
        release();
        if (err) { return console.error('Error executing query', err.stack) }
        res.status(200).send(`Order modified with ID: ${id}`)
      });
    });
  }
  
  const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.connect( (err, computerClient, release) => {
      if(err) { return console.error('Error acquiring client', err.stack) }
      computerClient.query('DELETE FROM orders WHERE id = $1', [id], (err, result) => {
        release();
        if (err) { return console.error('Error executing query', err.stack) }
        res.status(200).send(`Order deleted with ID: ${id}`)
      });
    });
  }

  module.exports = {
      getOrders,
      createOrder,
      updateOrder,
      deleteOrder
  }