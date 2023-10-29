const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'a126182900',
  port: 5432, // PostgreSQL 默认端口
});

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/submit', async (req, res) => {
  try {
      const data = req.body;
      console.log('Received data:', data)
     const response = await pool.query(
      'INSERT INTO thesis (t_name, apa, url, method, t_method, research_step, research_final) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [data.t_name, data.apa, data.url, data.method, data.t_method, data.research_step, data.research_final]
    );
    res.status(200).send('Data inserted.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
