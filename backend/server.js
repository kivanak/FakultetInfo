const express = require('express');
const cors = require('cors');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test ruta
app.get('/', (req, res) => {
  res.send('Server radi!');
});

// pokretanje servera
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server pokrenut na portu ${PORT}`);
});