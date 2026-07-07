require('dotenv').config();

const express = require('express');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/usuarios', usuarioRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
