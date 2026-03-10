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


// Atualizar pedido (agora permitindo atualização parcial)
async function updateOrder(req, res) {
  try {
    const { numeroPedido } = req.params;
    const body = req.body;

    // Aqui primeiro verifico se o pedido existe
    const existingOrder = await Order.findOne({ orderId: numeroPedido });

    if (!existingOrder) {
      return res.status(404).json({
        message: "Pedido não encontrado."
      });
    }

    // Aqui criei um objeto para armazenar somente os campos enviados
    const updatedFields = {};

    // Aqui verifico se veio valorTotal e atualizo o campo correspondente
    if (body.valorTotal !== undefined) {
      updatedFields.value = body.valorTotal;
    }

    // Aqui verifico se veio dataCriacao e converto para Date
    if (body.dataCriacao !== undefined) {
      updatedFields.creationDate = new Date(body.dataCriacao);
    }

    // Aqui verifico se vieram items e faço o mapeamento para o formato do banco
    if (body.items !== undefined && Array.isArray(body.items)) {
      updatedFields.items = body.items.map((item) => ({
        productId: Number(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem
      }));
    }

    // Caso nenhum campo válido seja enviado
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({
        message: "Nenhum campo válido foi enviado para atualização."
      });
    }

    // Aqui atualizo apenas os campos que foram enviados
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: numeroPedido },
      updatedFields,
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