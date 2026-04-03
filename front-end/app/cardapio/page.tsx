"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import ListaCardapio from "./listaCardapio";
import ListaPedidos from "./listaPedidos";
import { Toaster } from "@/components/ui/sonner";
import { ItemPedido } from "../schemas/pedidosSchemas";

export default function Page() {
  const [itensCarrinho, setItensCarrinho] = useState<ItemPedido[]>([]);

  const adicionarAoCarrinho = (novoItem: ItemPedido) => {
    setItensCarrinho((prev) => {
      const existe = prev.find((i) => i.idPrato === novoItem.idPrato);
      if (existe) {
        return prev.map((i) =>
          i.idPrato === novoItem.idPrato
            ? { ...i, quantidade: i.quantidade + 1 }
            : i,
        );
      }
      return [...prev, novoItem];
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F5ED] p-4 lg:p-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8">
          <div className="order-1 lg:order-2 lg:col-span-4">
            <ListaPedidos itens={itensCarrinho} setItens={setItensCarrinho} />
          </div>

          <div className="order-2 lg:order-1 lg:col-span-8">
            <ListaCardapio onAdicionarItem={adicionarAoCarrinho} />
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" richColors />
    </>
  );
}
