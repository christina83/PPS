// Endpoint to manage the machines
const express = require('express');
const router = express.Router();

// Diese get Abfrage sollte nicht auch noch die Ausgabe manipulieren, sondern nur rendern
router.get('/', async (req, res) => {
  const result = await client.query('SELECT * FROM machines ORDER BY id ASC');
  res.render('pages/machines', {
    machines: result.rows
  });
});

router.post('/', async (req, res) => {
  const { name, type } = req.body
  const result = await client.query('INSERT INTO machines (name, type) VALUES ($1, $2)', [name, type]);
  res.send(result);
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const { name, type } = req.body
  const result = await client.query('UPDATE machines SET name = $1, type = $2 WHERE id = $3', [name, type, id]);
  res.send(result);
});
  
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const result = await client.query('DELETE FROM machines WHERE id = $1', [id]);
  res.send(result);
});   


module.exports = router;