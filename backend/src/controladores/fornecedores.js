const knex = require('../conexao');
const schemaFornecedores = require('../verificacoes/schemaFornecedores');

async function cadastrarFornecedor(req, res) {
  const {
    nome,
    logo,
    estado_origem,
    custo_kwh,
    limite_minimo_kwh,
    total_clientes,
    avaliacao_media_clientes } = req.body;

  try {
    await schemaFornecedores.validate(req.body);

    const fornecedorProcurado = await knex('fornecedores').where({ nome, estado_origem }).first();

    if (fornecedorProcurado) {
      return res.status(400).json("Este fornecedor já está cadastrado.");
    }

    const fornecedor = await knex('fornecedores').insert({
      nome,
      logo,
      estado_origem,
      custo_kwh,
      limite_minimo_kwh,
      total_clientes,
      avaliacao_media_clientes
    }).returning('*');

    if (fornecedor.length === 0) {
      return res.status(400).json("Não foi possível cadastrar o fornecedor. Tente novamente.");
    }
    return res.status(200).json(fornecedor[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function listarFornecedores(req, res) {
  try {
    const listaFornecedores = await knex('fornecedores');
    return res.status(200).json(listaFornecedores);
  } catch (error) {
    return res.status(400).json(error.message);
  }

}

module.exports = { cadastrarFornecedor, listarFornecedores }