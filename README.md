# Desafio Clarke Energia Marketplace

Esta aplicação contém um projeto de plataforma que permite que usuários tenham acesso a dados de fornecedores de energia, para que este possa fazer uma pesquisa a fim de encontrar o melhor custo/benefício para suas necessidades. 

Este repositório contém uma aplicação front-end, bem como uma API da qual esta consome os dados.
A primeira foi desenvolvida em ReactJs e subsidiada por layouts do framework Material UI, enquanto a última conta com NodeJs e o framework Express.
Além disso, os dados estão armazenados em um banco de dados estruturado, mais especificamente PostgreSQL.

###Back-end

Para executar a API, é necessário instalar as dependências na pasta backend do projeto, por meio do comando **npm install**, e em seguida iniciá-la pelo comando **npm run dev**.

A API possui as seguintes rotas e métodos:

- **/usuarios**
    -   **método**: POST;
    -   **url**: http://localhost:3333/usuarios
    -   **objetivo**: cadastrar um usuário no sistema, sendo necessário informar nome, email, e senha de acesso à plataforma, a qual será criptografada por meio do método bcrypt. Dessa forma, será salva no banco de dados o hash da senha informada.
    <br>
- **/login**
    -   **método**: POST;
    -   **url**: http://localhost:3333/login
    -   **objetivo**: permitir que o usuário se autentique para ter acesso ao sistema. A autenticação é feita por meio meio de um token gerado pelo padrão JWT (Json Web Token);
<br>
- **/fornecedores**
    -   **método**: POST;
    -   **url**: http://localhost:3333/fornecedores
    -   **objetivo**: esta rota deve ser disponibilizada não para clientes, e sim para os funcionários responsáveis pela disponibilização de informações sobre fornecedores aos usuários. Para que seja feito o cadastro, devem ser informados os seguintes dados do fornecedor: nome, logotipo, localização (estado), custo por kWh, limite mínimo de kWh, total de clientes e avaliação média dos clientes.
<br>
- **/fornecedores**
    -   **método**: GET;
    -   **url**: http://localhost:3333/fornecedores
    -   **objetivo**: obter os dados mencionados acima sobre fornecedores cadastrados, para que o usuário possa fazer uma busca sobre quais fornecedores são capazes de atender às suas demandas, e o custo do kW/h;

Informações adicionais: é utilizado o construtor de esquema de validações Yup para validar as informações fornecidas no cadastro de usuários e fornecedores, bem como no login do usuário.

###Front-end

Para abrir a página no navegador, após iniciar a API no back-end, é necessário instalar as dependências na pasta frontend do projeto, por meio do comando **npm install**, e em seguida iniciá-la pelo comando **npm start**.

A aplicação no front-end foi construída a partir de layouts e componentes do framework Material UI, e possui três rotas:
<br>

-   **/ ou /login**
    -   ambas as rotas permitem que o usuário acesse a página de login. A segunda rota é chamada caso o usuário tente acessar uma rota protegida sem estar autenticado;
<br>
-   **/home**
    -   nesta rota, o usuário terá acesso a uma tabela com todos os fornecedores disponíveis. No input acima desta tabela, o usuário informará sua demanda de energia, e ao clicar no botão "Pesquisar", os resultados desta pesquisa serão exibidos em uma segunda tabela.
    -   no canto superior direito da tela há uma imagem que representa a função de logout, e ao clicar nesta, o usuário sai do sistema.
<br>
-   **/sign-up**
    -   a rota de cadastro permite que um novo usuário seja cadastrado. Caso este informe um email já cadastrado, ou qualquer um dos campos nome, e-mail ou senha não estiverem preenchidos, não será possível concluir o cadastro, e aparecerá no canto superior direito da tela uma mensagem de erro.