const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/usuarios', usuarioRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});