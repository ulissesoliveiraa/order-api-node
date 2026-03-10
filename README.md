# 📦 Order API – Sistema de Gerenciamento de Pedidos

API REST desenvolvida em **Node.js** para gerenciamento de pedidos, permitindo realizar operações de **criação, consulta, listagem, atualização e exclusão de pedidos**.

Este projeto foi desenvolvido como parte de um **teste técnico para a vaga de Analista de Sistemas Jr**, com foco em:

- Desenvolvimento de APIs REST
- Integração com banco de dados
- Transformação (mapping) de dados
- Organização de código
- Boas práticas de backend

---

# 🚀 Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js** – ambiente de execução JavaScript
- **Express.js** – framework para criação da API
- **MongoDB** – banco de dados NoSQL
- **Mongoose** – ODM para comunicação com o MongoDB
- **Dotenv** – gerenciamento de variáveis de ambiente
- **Nodemon** – reinicialização automática do servidor em desenvolvimento
- **Postman** – ferramenta utilizada para testes dos endpoints

---

# 🧠 Arquitetura do Projeto

O projeto foi organizado seguindo o padrão de separação de responsabilidades para facilitar manutenção e escalabilidade.
order-api
│
├── src
│ ├── config
│ │ db.js # Conexão com o banco de dados
│ │
│ ├── controllers
│ │ orderController.js # Lógica das operações da API
│ │
│ ├── models
│ │ Order.js # Schema do MongoDB
│ │
│ ├── routes
│ │ orderRoutes.js # Definição das rotas da API
│ │
│ ├── utils
│ │ orderMapper.js # Transformação dos dados recebidos
│
├── .env.example # Exemplo de variáveis de ambiente
├── package.json
├── server.js # Arquivo principal da aplicação
└── README.md

order-api
│
├── src
│ ├── config
│ │ db.js # Conexão com o banco de dados
│ │
│ ├── controllers
│ │ orderController.js # Lógica das operações da API
│ │
│ ├── models
│ │ Order.js # Schema do MongoDB
│ │
│ ├── routes
│ │ orderRoutes.js # Definição das rotas da API
│ │
│ ├── utils
│ │ orderMapper.js # Transformação dos dados recebidos
│
├── .env.example # Exemplo de variáveis de ambiente
├── package.json
├── server.js # Arquivo principal da aplicação
└── README.md
2️⃣ Acessar a pasta do projeto
cd order-api

3️⃣ Instalar as dependências
npm install

4️⃣ Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto.

Exemplo:
PORT=3000
MONGO_URI=mongodb://localhost:27017/orderdb

5️⃣ Executar a aplicação
npm run dev

Se tudo estiver correto, o terminal exibirá:
Banco de dados conectado com sucesso.
Servidor rodando em http://localhost:3000

🔌 Endpoints da API

A API implementa as seguintes operações:

📌 Criar pedido (Obrigatório)

Cria um novo pedido no sistema.

POST
/order

Exemplo de Request
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}

🔎 Buscar pedido por número (Obrigatório)

GET

/order/:numeroPedido
Exemplo
/order/v10089015vdb
📋 Listar todos os pedidos (Opcional)

GET

/order/list
✏️ Atualizar pedido (Opcional)

PUT

/order/:numeroPedido
❌ Deletar pedido (Opcional)

DELETE

/order/:numeroPedido
🔄 Transformação dos dados (Mapping)

A API recebe os dados em um formato específico e realiza uma transformação antes de salvar no banco de dados.

Payload recebido
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
Formato salvo no banco
{
  "orderId": "v10089015vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}

Essa transformação foi implementada utilizando um mapper responsável por converter os campos recebidos para o formato esperado no banco de dados.

🗄 Banco de Dados

O projeto utiliza MongoDB como banco de dados.

Collection utilizada:

orders

Cada documento contém:

orderId
value
creationDate
items
🧪 Testes da API

Os testes foram realizados utilizando Postman.

Fluxo de testes realizado:

1️⃣ Criar pedido
2️⃣ Buscar pedido pelo número
3️⃣ Listar pedidos
4️⃣ Atualizar pedido
5️⃣ Deletar pedido

📌 Possíveis melhorias futuras

Como evolução do projeto, poderiam ser adicionadas melhorias como:

🔐 Autenticação utilizando JWT

📚 Documentação automática da API com Swagger

✅ Validação de dados com Joi ou Zod

📄 Paginação na listagem de pedidos

🔄 Comunicação assíncrona com RabbitMQ

☁️ Deploy em ambiente cloud (AWS / Azure / Render)

# 📄 Documentação da API

A documentação completa da API está disponível online via Postman.

🔗 Acesse aqui:  
https://documenter.getpostman.com/view/53053479/2sBXcLhdng

A documentação inclui:

- Descrição dos endpoints
- Métodos HTTP utilizados
- Parâmetros de requisição
- Exemplos de payload
- Exemplos de resposta da API

👨‍💻 Autor

José Ulisses Araújo Oliveira

ENGENHEIRO DE SOFTWARE
