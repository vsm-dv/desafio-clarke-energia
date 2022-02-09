const express = require('express');
const usuarios = require('./controladores/usuarios');
const autenticacao = require('./controladores/autenticacao');
const fornecedores = require('./controladores/fornecedores');

const rotas = express();

rotas.post('/usuarios', usuarios.cadastrarUsuario);
rotas.post('/login', autenticacao.login);

rotas.post('/fornecedores', fornecedores.cadastrarFornecedor);
rotas.get('/fornecedores', fornecedores.listarFornecedores);

module.exports = rotas;