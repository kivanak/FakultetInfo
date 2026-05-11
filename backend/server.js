const pool = require('./config/db'); // spajanje baze

const express = require('express'); // biblioteka za node.js
const cors = require('cors'); // komunikacija između front-a i back-a

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test ruta
app.get('/', (req, res) => {
  res.send('Server radi!');
});

// test konekcije sa bazom
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Greška u konekciji sa bazom');
  }
});

// svi fakulteti
app.get('/faculties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM faculties');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Greška.');
  }
});

// jedan fakultet po ID-u
app.get('/faculties/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      'SELECT * FROM faculties WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Fakultet nije pronađen.'
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Greška.');
  }
});

// dodavanje novog fakulteta
app.post('/faculties', async (req, res) => {
  try {
    const {
      name,
      university_name,
      city,
      address,
      type,
      description,
      website_url
    } = req.body;

    const result = await pool.query(
      `INSERT INTO faculties
      (name, university_name, city, address, type, description, website_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        name,
        university_name,
        city,
        address,
        type,
        description,
        website_url
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Greška pri dodavanju fakulteta.');
  }
});

// pokretanje servera
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server pokrenut na portu ${PORT}`);
});