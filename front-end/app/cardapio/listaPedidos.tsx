"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MapPin, ArrowRight, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ItemPedido } from "../schemas/pedidosSchemas";

interface ListaPedidosProps {
  itens: ItemPedido[];
  setItens: React.Dispatch<React.SetStateAction<ItemPedido[]>>;
}

export default function ListaPedidos({ itens, setItens }: ListaPedidosProps) {
  const [endereco, setEndereco] = useState("");
  const taxaEntrega = 5.0; // Reduzi para combinar com um valor comum

  const subtotal = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0,
  );
  const total = subtotal > 0 ? subtotal + taxaEntrega : 0;

  const removerItem = (id: number) => {
    setItens((prev) => prev.filter((i) => i.idPrato !== id));
  };

  return (
    <aside className="bg-white rounded-lg p-8 shadow-xl border border-gray-100 sticky top-24">
      {/* Header do Pedido */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-[#F0F4EF] p-4 rounded-2xl relative">
          <ShoppingBag size={28} className="text-[#2D4A26]" />
          {itens.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#2D4A26] text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-bold border-2 border-white">
              {itens.reduce((acc, i) => acc + i.quantidade, 0)}
            </span>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Seu Pedido</h2>
      </div>

      {/* Lista de Itens */}
      <div className="space-y-4 mb-8 max-h-[250px] overflow-y-auto no-scrollbar">
        {itens.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">
            Nenhum item adicionado
          </p>
        ) : (
          itens.map((item) => (
            <div
              key={item.idPrato}
              className="flex justify-between items-center group"
            >
              <div className="flex flex-col">
                <span className="font-bold text-gray-700 text-sm">
                  {item.nome}
                </span>
                <span className="text-xs text-gray-400">
                  {item.quantidade}x R$ {item.preco.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => removerItem(item.idPrato)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Seção de Endereço - Estilo Wireframe */}
      <div className="bg-[#F8FAF8] rounded-[1.5rem] p-5 mb-8">
        <div className="flex items-center gap-2 mb-3 text-[#4A7C44] font-semibold text-sm">
          <MapPin size={18} />
          <span>Endereço de Entrega</span>
        </div>
        <Input
          placeholder="Rua, número, bairro..."
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className="bg-white border-none rounded-xl h-12 text-sm shadow-sm placeholder:text-gray-300"
        />
      </div>

      {/* Totais */}
      <div className="space-y-3 border-t border-gray-50 pt-6 mb-8">
        <div className="flex justify-between text-sm font-bold text-gray-800">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-gray-800">
          <span>Taxa de Entrega</span>
          <span>R$ {subtotal > 0 ? taxaEntrega.toFixed(2) : "0,00"}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-[#2D4A26] pt-2">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Botão de Confirmação */}
      <Button
        disabled={itens.length === 0}
        className="w-full bg-[#2D4A26] hover:bg-[#1e331a] text-white rounded-full py-8 text-lg font-bold shadow-lg flex justify-between px-8 transition-all active:scale-95"
      >
        <span>Confirmar Pedido</span>
        <ArrowRight size={24} />
      </Button>
    </aside>
  );
}
