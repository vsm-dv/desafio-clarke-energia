const yup = require('./configuracoes');

const schemaCadastroUsuario = yup.object().shape({
    nome: yup.string().required('O campo nome é obrigatório.'),
    email: yup.string().required('O campo email é obrigatório').email(),
    senha: yup.string().required('O campo senha é obrigatório.').min(8)
});

module.exports = schemaCadastroUsuario;