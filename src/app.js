const express = require("express");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware para permitir JSON no body
app.use(express.json());

// Rotas da aplicação
app.use("/", orderRoutes);

// Rota simples para testar se a API está funcionando
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API de pedidos funcionando."
  });
});

module.exports = app;