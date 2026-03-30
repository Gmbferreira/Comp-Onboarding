"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Loader2 } from "lucide-react";
import { CategoriaPrato, Prato } from "../schemas/cardapioSchemas";
import { API_ROUTES } from "../config/api-routes";
import { mockPratos } from "../mocks/cardapioMock";
import { ItemPedido } from "../schemas/pedidosSchemas";

interface ListaCardapioProps {
  onAdicionarItem: (item: ItemPedido) => void;
}

export default function ListaCardapio({ onAdicionarItem }: ListaCardapioProps) {
  const [todosPratos, setTodosPratos] = useState<Prato[]>([]);
  const [filtro, setFiltro] = useState<CategoriaPrato | "TODOS">("TODOS");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await fetch(API_ROUTES.pratos.list);
        if (!response.ok) throw new Error("Erro ao acessar servidor");
        const data = await response.json();
        setTodosPratos(data);
      } catch (error) {
        console.warn("Servidor offline. Carregando Mocks...");
        setTodosPratos(mockPratos);
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

  const pratosFiltrados =
    filtro === "TODOS"
      ? todosPratos
      : todosPratos.filter((p) => p.categoria === filtro);

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#4A7C44]" size={48} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-20">
      <h1 className="text-center text-5xl font-bold py-12 text-[#1a1a1a]">
        Cardápio
      </h1>

      {/* Navegação de Filtros */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <Button
          variant="outline"
          className="rounded-full px-8 py-6 text-lg bg-[#D1E7D3] border-none opacity-80 cursor-not-allowed"
        >
          Mais Pedidos
        </Button>

        <Button
          onClick={() => setFiltro("TODOS")}
          className={`rounded-full px-10 py-6 text-lg shadow-sm border-none transition-all ${
            filtro === "TODOS"
              ? "bg-[#4A7C44] text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          Todos
        </Button>

        <Button
          onClick={() => setFiltro("REFEICAO")}
          className={`rounded-full px-10 py-6 text-lg shadow-sm border-none transition-all ${
            filtro === "REFEICAO"
              ? "bg-[#4A7C44] text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          Pratos
        </Button>

        <Button
          onClick={() => setFiltro("SOBREMESA")}
          className={`rounded-full px-10 py-6 text-lg shadow-sm border-none transition-all ${
            filtro === "SOBREMESA"
              ? "bg-[#4A7C44] text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          Sobremesas
        </Button>

        <Button
          onClick={() => setFiltro("ACOMPANHAMENTO")}
          className={`rounded-full px-10 py-6 text-lg shadow-sm border-none transition-all ${
            filtro === "ACOMPANHAMENTO"
              ? "bg-[#4A7C44] text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          Acompanhamentos
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pratosFiltrados.map((prato) => (
          <Card
            key={prato.id}
            className="border-none shadow-md overflow-hidden bg-white rounded-xl"
          >
            <div className="relative h-52 w-full">
              <img
                src={prato.imagem}
                alt={prato.nome}
                className="w-full h-full object-cover"
              />
            </div>

            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-1">
                <h2 className="text-xl font-bold text-[#4A7C44]">
                  {prato.nome}
                </h2>
                <span className="font-bold text-gray-700">
                  ${prato.preco.toFixed(2)}
                </span>
              </div>

              <p className="text-[10px] text-gray-400 mb-1 uppercase font-bold tracking-wider">
                Descrição
              </p>
              <p className="text-sm text-[#8BAE86] leading-snug mb-4 h-10 line-clamp-2">
                {prato.descricao}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < prato.nota
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-[#f3f3f3] hover:bg-[#e6e6e6] rounded-lg h-9 w-9"
                  onClick={() =>
                    onAdicionarItem({
                      idPrato: prato.id,
                      nome: prato.nome,
                      preco: prato.preco,
                      quantidade: 1,
                    })
                  }
                >
                  <ShoppingBag size={20} className="text-black" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
