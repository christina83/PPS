const express = require('express');
const router = express.Router();
const Pool = require('pg').Pool

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getOrders = (req, res) => {
  pool.query('SELECT * FROM orders ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  });
};

const createOrder = (req, res) => {
  const { client, task, temperature, material } = req.body

  pool.query('INSERT INTO orders (client, task, temperature, material) VALUES ($1, $2, $3, $4)', [client, task, temperature, material], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Order added with ID: ${results.insertId}`)
  });
};

const updateOrder = (req, res) => {
  const id = parseInt(req.params.id)
  const { client, task, temperature, material } = req.body

  pool.query(
    'UPDATE orders SET client = $1, task = $2, temperature = $3, material = $4 WHERE id = $5',
    [client, task, temperature, material, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Order modified with ID: ${id}`)
    }
  )
}

const deleteOrder = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM orders WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Order deleted with ID: ${id}`)
  })
}

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;