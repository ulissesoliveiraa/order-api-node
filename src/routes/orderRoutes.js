const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

// Rota obrigatória para criar pedido
router.post("/order", createOrder);

// Rota opcional para listar todos os pedidos
router.get("/order/list", listOrders);

// Rota obrigatória para buscar pedido pelo número
router.get("/order/:numeroPedido", getOrderById);

// Rota opcional para atualizar pedido
router.put("/order/:numeroPedido", updateOrder);

// Rota opcional para deletar pedido
router.delete("/order/:numeroPedido", deleteOrder);

module.exports = router;