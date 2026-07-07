const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'usuarios',
  timestamps: true,
});

module.exports = Usuario;