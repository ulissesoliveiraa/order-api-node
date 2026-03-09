const mongoose = require("mongoose");

// Aqui defini o schema dos itens do pedido
const itemSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { _id: true }
);

// Aqui defini o schema principal do pedido
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    value: {
      type: Number,
      required: true
    },
    creationDate: {
      type: Date,
      required: true
    },
    items: {
      type: [itemSchema],
      required: true
    }
  },
  {
    versionKey: "__v"
  }
);

module.exports = mongoose.model("Order", orderSchema);