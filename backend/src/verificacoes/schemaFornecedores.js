const yup = require('./configuracoes');

const schemaFornecedores = yup.object().shape({
    nome: yup.string().required('O campo nome é obrigatório.'),
    logo: yup.string().required('O campo logo é obrigatório.'),
    estado_origem: yup.string().required('O campo estado_origem é obrigatório.').max(2).min(2),
    custo_kwh: yup.number().required('O campo custo_kwh é obrigatório.').moreThan(0),
    limite_minimo_kwh: yup.number().required('O campo limite_minimo_kwh é obrigatório.').moreThan(0),
    total_clientes: yup.number().required('O campo total_clientes é obrigatório.').min(0),
    avaliacao_media_clientes: yup.number().required('O campo avaliacao_media_clientes é obrigatório.').min(0).max(10),
});

module.exports = schemaFornecedores;