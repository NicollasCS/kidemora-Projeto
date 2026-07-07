const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [];

app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;
  usuarios.push({ nome, email, senha });
  res.json(usuarios);
});

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.delete('/usuarios', (req, res) => {
  const { email } = req.body;
  usuarios = usuarios.filter(u => u.email !== email);
  res.json(usuarios);
});

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});