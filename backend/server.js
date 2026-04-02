const pool = require('./config/db'); //spajanje baze

const express = require('express');  //biblioteka za node.js
const cors = require('cors'); //kom izmedju front-a i bek-a
//mogu biti na razlicitm portovima, i ovim se omogucava komunikacija
const app = express(); //centralna stvar 

// middleware
app.use(cors());
app.use(express.json()); //json podatak, prebacivanje u JS objekat

// test ruta
app.get('/', (req, res) => {  //request and response
  res.send('Server radi!');
});

//Naknadno dodato
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Greška u konekciji sa bazom');
  }
});

app.get('/faculties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM faculties');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Greška.');
  }
});

// pokretanje servera
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server pokrenut na portu ${PORT}`);
});