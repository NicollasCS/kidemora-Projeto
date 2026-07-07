const express = require('express');
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/usuarios', usuarioRoutes);

async function iniciarServidor() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Banco sincronizado com Sequelize.');

    app.listen(3001, () => {
      console.log('Servidor rodando em http://localhost:3001');
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

iniciarServidor();