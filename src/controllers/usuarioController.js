const crypto = require('crypto');

let usuarios = [];
let nextId = 1;

function md5(value) {
  return crypto.createHash('md5').update(value).digest('hex');
}

exports.criarUsuario = (req, res) => {
  try {
    const { nome, email, senha, idade } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
    }

    const usuario = {
      id: nextId++,
      nome,
      email,
      token: md5(email),
      senha: md5(senha),
      idade: idade || null,
      saldo: 0,
    };

    usuarios.push(usuario);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar usuário.', detalhes: error.message });
  }
};

exports.listarUsuarios = (_req, res) => {
  res.json(usuarios);
};

exports.buscarUsuarioPorId = (req, res) => {
  const usuario = usuarios.find((u) => u.id === Number(req.params.id));

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  res.json(usuario);
};

exports.creditarSaldo = (req, res) => {
  const usuario = usuarios.find((u) => u.id === Number(req.params.id));

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  const valor = Number(req.body.valor);

  if (!valor || valor <= 0) {
    return res.status(400).json({ erro: 'Informe um valor válido para recarga.' });
  }

  usuario.saldo = Number(usuario.saldo) + valor;
  res.json({ mensagem: 'Crédito adicionado com sucesso.', usuario });
};

exports.gastarPassagem = (req, res) => {
  const usuario = usuarios.find((u) => u.id === Number(req.params.id));

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
  res.json({ mensagem: 'Passagem paga com sucesso.', usuario });
};