export interface ItemPedido {
  idPrato: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export interface PedidoEnvio {
  itens: ItemPedido[];
  subtotal: number;
  taxaEntrega: number;
  total: number;
}
