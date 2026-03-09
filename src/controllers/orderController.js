const Order = require("../models/Order");
const mapOrderPayload = require("../utils/orderMapper");

// Aqui implementei a função para criar um novo pedido
async function createOrder(req, res) {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    // Aqui valido se os campos obrigatórios vieram corretamente
    if (!numeroPedido || !valorTotal || !dataCriacao || !items || !Array.isArray(items)) {
      return res.status(400).json({
        message: "Dados inválidos. Verifique numeroPedido, valorTotal, dataCriacao e items."
      });
    }

    // Aqui faço o mapeamento dos campos recebidos para o formato do banco
    const mappedOrder = mapOrderPayload(req.body);

    // Aqui verifico se já existe um pedido com o mesmo orderId
    const existingOrder = await Order.findOne({ orderId: mappedOrder.orderId });

    if (existingOrder) {
      return res.status(409).json({
        message: "Já existe um pedido com esse orderId."
      });
    }

    // Aqui crio o pedido no banco de dados
    const newOrder = await Order.create(mappedOrder);

    return res.status(201).json({
      message: "Pedido criado com sucesso.",
      data: newOrder
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno ao criar pedido.",
      error: error.message
    });
  }
}

// Buscar pedido por orderId
async function getOrderById(req, res) {
  try {
    const { numeroPedido } = req.params;

    const order = await Order.findOne({ orderId: numeroPedido });

    if (!order) {
      return res.status(404).json({
        message: "Pedido não encontrado."
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno ao buscar pedido.",
      error: error.message
    });
  }
}

// Listar todos os pedidos
async function listOrders(req, res) {
  try {
    const orders = await Order.find();

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno ao listar pedidos.",
      error: error.message
    });
  }
}

// Atualizar pedido
async function updateOrder(req, res) {
  try {
    const { numeroPedido } = req.params;

    const existingOrder = await Order.findOne({ orderId: numeroPedido });

    if (!existingOrder) {
      return res.status(404).json({
        message: "Pedido não encontrado."
      });
    }

    const mappedOrder = mapOrderPayload(req.body);

    // Aqui garanto que o orderId atualizado será o mesmo passado na URL
    mappedOrder.orderId = numeroPedido;

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: numeroPedido },
      mappedOrder,
      { new: true }
    );

    return res.status(200).json({
      message: "Pedido atualizado com sucesso.",
      data: updatedOrder
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno ao atualizar pedido.",
      error: error.message
    });
  }
}

// Deletar pedido
async function deleteOrder(req, res) {
  try {
    const { numeroPedido } = req.params;

    const deletedOrder = await Order.findOneAndDelete({ orderId: numeroPedido });

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Pedido não encontrado."
      });
    }

    return res.status(200).json({
      message: "Pedido deletado com sucesso."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno ao deletar pedido.",
      error: error.message
    });
  }
}

module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder
};