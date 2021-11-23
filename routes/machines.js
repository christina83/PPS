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

const getMachines = (req, res) => {
  pool.query('SELECT * FROM machines ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  });
};

const createMachine = (req, res) => {
  const { name, type } = req.body

  pool.query('INSERT INTO machines (name, type) VALUES ($1, $2)', [name, type], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Machine added with ID: ${results.insertId}`)
  });
};

const updateMachine = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, type } = req.body

  pool.query(
    'UPDATE machines SET name = $1, type = $2 WHERE id = $3',
    [name, type, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Machine modified with ID: ${id}`)
    }
  )
}

const deleteMachine = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM machines WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Machine deleted with ID: ${id}`)
  })
}

router.get('/', getMachines);
router.post('/', createMachine);
router.put('/:id', updateMachine);
router.delete('/:id', deleteMachine);

module.exports = router;