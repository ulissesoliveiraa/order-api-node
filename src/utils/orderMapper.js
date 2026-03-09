function mapOrderPayload(payload) {
  // Aqui pego o numeroPedido e removo o sufixo final, como -01
  // Exemplo: v10089015vdb-01 -> v10089015vdb
  const orderId = payload.numeroPedido.split("-")[0];

  return {
    orderId: orderId,
    value: payload.valorTotal,
    creationDate: new Date(payload.dataCriacao),
    items: payload.items.map((item) => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };
}

module.exports = mapOrderPayload;