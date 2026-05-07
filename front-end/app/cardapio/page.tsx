"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import ListaCardapio from "./listaCardapio";
import ListaPedidos from "./listaPedidos";
import { Toaster } from "@/components/ui/sonner";
import { ItemPedido } from "../schemas/pedidosSchemas";

// Cor verde escuro da paleta
const COR_BORDA = "border-[#1A3B21]";

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
    <div className="min-h-screen flex flex-col">
      <Navbar links={[{ href: "/cardapio", title: "Cardápio" }]} />

      <main
        className="flex-grow flex items-start justify-center p-4 lg:p-12 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: "url('/Background2.png')" }}
      >
        {/* CARD PRINCIPAL 
          - border-[4px]: Borda externa de 4px
          - overflow-hidden: Garante que a linha interna não ultrapasse o arredondamento
        */}
        <div
          className={`w-full max-w-7xl bg-[#FDFDFB]/95 backdrop-blur-md rounded-[40px] shadow-2xl border-[4px] ${COR_BORDA} overflow-hidden`}
        >
          <div className="flex flex-col lg:grid lg:grid-cols-12">
            {/* COLUNA ESQUERDA: Cardápio
                - lg:border-r-[4px]: Linha vertical de 4px no desktop
                - p-8 lg:p-16: O padding foi movido para cá para a linha ir até as bordas do card
            */}
            <div
              className={`lg:col-span-8 p-8 lg:p-16 border-b-[4px] lg:border-b-0 lg:border-r-[4px] ${COR_BORDA}`}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-12 text-[#1a1a1a] tracking-tight">
                Cardápio
              </h1>
              <ListaCardapio onAdicionarItem={adicionarAoCarrinho} />
            </div>

            {/* COLUNA DIREITA: Pedidos
                - p-8 lg:p-16: Padding interno para manter o respiro
            */}
            <div className="lg:col-span-4 p-8 lg:p-16 bg-white/30">
              <div className="lg:sticky lg:top-8 h-fit">
                <ListaPedidos
                  itens={itensCarrinho}
                  setItens={setItensCarrinho}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
