const knex = require('../conexao');
const bcrypt = require('bcrypt');
const schemaCadastroUsuario = require('../verificacoes/schemaCadastroUsuario');

async function cadastrarUsuario(req, res) {
  const { nome, email, senha } = req.body;

  try {
    await schemaCadastroUsuario.validate(req.body);

    const usuarioProcurado = await knex('usuarios').where({ email }).first();

    if (usuarioProcurado) {
      return res.status(400).json("Este email já está cadastrado.");
    }

    const senhaBcrypt = await bcrypt.hash(senha, 10);

    const usuario = await knex('usuarios').insert({ nome, email, senha: senhaBcrypt }).returning('*');

    if (usuario.length === 0) {
      return res.status(400).json("Não foi possível cadastrar o usuário. Tente novamente.");
    }

    return res.status(200).json("Usuário cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { cadastrarUsuario }