const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schemaLogin = require('../verificacoes/schemaLogin');
const jwtSecret = process.env.SENHA_JWT;

async function login(req, res) {
    const { email, senha } = req.body;

    try {
        await schemaLogin.validate(req.body);

        const usuarioProcurado = await knex('usuarios').where({ email }).first();

        if (!usuarioProcurado) {
            return res.status(404).json("Este usuário não foi encontrado.");
        }

        const verificacaoSenha = await bcrypt.compare(senha, usuarioProcurado.senha);

        if (!verificacaoSenha) {
            return res.status(401).json("Usuário ou senha inválidos.");
        }

        const token = jwt.sign({ id: usuarioProcurado.id }, jwtSecret, { expiresIn: "4h" });
        const { senha: _, ...dadosUsuario } = usuarioProcurado;
        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { login }