const Pool = require('pg').Pool

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getMachines = (request, response) => {
  pool.query('SELECT * FROM machines ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
};

const createMachine = (request, response) => {
  console.log(request.body);
  const { name, type } = request.body

  pool.query('INSERT INTO machines (name, type) VALUES ($1, $2)', [name, type], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Machine added with ID: ${results.insertId}`)
  });
};

const updateMachine = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, type } = request.body

  pool.query(
    'UPDATE machines SET name = $1, type = $2 WHERE id = $3',
    [name, type, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Machine modified with ID: ${id}`)
    }
  )
}

const deleteMachine = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM machines WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Machine deleted with ID: ${id}`)
  })
}

module.exports = {
  getMachines,
  createMachine,
  updateMachine,
  deleteMachine,
}