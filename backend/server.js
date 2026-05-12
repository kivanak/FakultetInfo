const pool = require('./config/db'); // spajanje baze

const express = require('express'); // biblioteka za node.js
const cors = require('cors'); // komunikacija između front-a i back-a

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
app.delete('/faculties/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      'DELETE FROM faculties WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Fakultet nije pronađen.' });
    }

    res.json({ message: 'Fakultet je obrisan.', faculty: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Greška pri brisanju fakulteta.');
  }
});
app.put('/faculties/:id', async (req, res) => {
  try {
    const id = req.params.id;

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
      `UPDATE faculties
      SET
        name = $1,
        university_name = $2,
        city = $3,
        address = $4,
        type = $5,
        description = $6,
        website_url = $7
      WHERE id = $8
      RETURNING *`,
      [
        name,
        university_name,
        city,
        address,
        type,
        description,
        website_url,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Fakultet nije pronađen.'
      });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Greška pri izmjeni fakulteta.');
  }
});


app.post('/register', async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        message: 'Sva polja su obavezna.'
      });
    }

    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: 'Korisnik sa ovim emailom već postoji.'
      });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, email, role`,
      [full_name, email, password_hash, 'user']
    );

    res.status(201).json({
      message: 'Registracija uspješna.',
      user: result.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Greška pri registraciji.'
    });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email i lozinka su obavezni.'
      });
    }

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: 'Neispravan email ili lozinka.'
      });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(400).json({
        message: 'Neispravan email ili lozinka.'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      'tajna_lozinka',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login uspješan.',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Greška pri login-u.'
    });
  }
});
// pokretanje servera
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server pokrenut na portu ${PORT}`);
});