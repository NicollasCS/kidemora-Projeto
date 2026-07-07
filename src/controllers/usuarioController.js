const { Usuario } = require('../models');

exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, idade } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
    }

    const usuario = await Usuario.create({ nome, email, senha, idade, saldo: 0 });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar usuário.', detalhes: error.message });
  }
};

exports.listarUsuarios = async (_req, res) => {
  try {
    const usuarios = await Usuario.findAll({ order: [['id', 'ASC']] });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar usuários.', detalhes: error.message });
  }
};

exports.buscarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuário.', detalhes: error.message });
  }
};

exports.creditarSaldo = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    const valor = Number(req.body.valor);

    if (!valor || valor <= 0) {
      return res.status(400).json({ erro: 'Informe um valor válido para recarga.' });
    }

    usuario.saldo = Number(usuario.saldo) + valor;
    await usuario.save();

    res.json({ mensagem: 'Crédito adicionado com sucesso.', usuario });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao recarregar saldo.', detalhes: error.message });
  }
};

exports.gastarPassagem = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    const valor = Number(req.body.valor || req.body.valorPassagem);

    if (!valor || valor <= 0) {
      return res.status(400).json({ erro: 'Informe o valor da passagem.' });
    }

    if (Number(usuario.saldo) < valor) {
      return res.status(400).json({ erro: 'Saldo insuficiente para essa passagem.' });
    }

    usuario.saldo = Number(usuario.saldo) - valor;
    await usuario.save();

    res.json({ mensagem: 'Passagem paga com sucesso.', usuario });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gastar saldo com passagem.', detalhes: error.message });
  }
};