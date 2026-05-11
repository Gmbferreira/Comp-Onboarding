"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  Loader2,
  ImageIcon,
  LayoutGrid,
  Soup,
  Dessert,
  Coffee,
  Plus
} from "lucide-react";
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
        if (!response.ok) throw new Error("Erro");
        const data = await response.json();
        setTodosPratos(data);
      } catch (error) {
        setTodosPratos(mockPratos);
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

  const categorias = [
    { id: "TODOS", label: "Todos", icon: <LayoutGrid className="h-4 w-4" /> },
    { id: "REFEICAO", label: "Pratos", icon: <Soup className="h-4 w-4" /> },
    { id: "SOBREMESA", label: "Sobremesas", icon: <Dessert className="h-4 w-4" /> },
    { id: "BEBIDA", label: "Bebidas", icon: <Coffee className="h-4 w-4" /> },
  ];

  const pratosFiltrados = filtro === "TODOS" 
    ? todosPratos 
    : todosPratos.filter((p) => p.categoria === filtro);

  if (carregando) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#4A7C44]" size={40} /></div>;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-800 italic">Nosso Cardápio</h1>
        <div className="h-1 w-16 bg-[#4A7C44] mt-2 rounded-full" />
      </div>

      <div className="flex overflow-x-auto gap-3 mb-10 pb-2 no-scrollbar">
        {categorias.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => setFiltro(cat.id as any)}
            className={`rounded-full px-6 py-5 flex gap-3 border-none shadow-sm transition-all ${
              filtro === cat.id ? "bg-[#2D4A26] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {cat.icon} <span className="font-semibold text-sm">{cat.label}</span>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {pratosFiltrados.map((prato) => (
          <Card key={prato.id} className="border-none shadow-sm overflow-hidden bg-white rounded-[2rem]">
            <div className="relative h-44 w-full">
              <img src={prato.imagem ?? ""} alt={prato.nome} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm font-bold text-[#4A7C44] text-sm">
                R$ {prato.preco.toFixed(2)}
              </div>
            </div>
            <CardContent className="p-5">
              <h2 className="text-lg font-bold text-gray-800 truncate">{prato.nome}</h2>
              <p className="text-xs text-gray-500 mb-4 line-clamp-2">{prato.descricao}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < (prato.nota ?? 5) ? "fill-yellow-400 text-yellow-400" : "text-gray-100"} />
                  ))}
                </div>
                <Button 
                  size="icon" 
                  className="bg-[#F0F4EF] hover:bg-[#4A7C44] text-[#4A7C44] hover:text-white rounded-xl transition-colors"
                  onClick={() => onAdicionarItem({ idPrato: prato.id, nome: prato.nome, preco: prato.preco, quantidade: 1 })}
                >
                  <Plus size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}