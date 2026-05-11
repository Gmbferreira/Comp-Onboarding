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
} from "lucide-react";
import { CategoriaPrato, Prato } from "../schemas/cardapioSchemas";
import { API_ROUTES } from "../config/api-routes";
import { mockPratos } from "../mocks/cardapioMock";

export default function ListaCardapio() {
  const [todosPratos, setTodosPratos] = useState<Prato[]>([]);
  const [filtro, setFiltro] = useState<CategoriaPrato | "TODOS">("TODOS");
  const [carregando, setCarregando] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 12;

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

  const pratosFiltrados =
    filtro === "TODOS"
      ? todosPratos
      : todosPratos.filter((p) => p.categoria === filtro);

  const pratosExibidos = pratosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#4A7C44]" size={48} />
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      {/* Título refinado */}
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-800 italic">
          Nosso Cardápio
        </h1>
        <div className="h-1 w-20 bg-[#4A7C44] mt-2 rounded-full" />
      </div>

      {/* Filtros alinhados à esquerda como no wireframe */}
      <div className="flex overflow-x-auto gap-3 mb-12 pb-2 no-scrollbar justify-start">
        {categorias.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => {
              setFiltro(cat.id as any);
              setPaginaAtual(1);
            }}
            className={`rounded-full px-6 py-6 flex gap-3 items-center border-none shadow-sm transition-all duration-300 ${
              filtro === cat.id
                ? "bg-[#2D4A26] text-white hover:bg-[#233a1e]" // Verde escuro do wireframe
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {cat.icon}
            <span className="font-semibold text-sm">{cat.label}</span>
          </Button>
        ))}
      </div>

      {/* Grid de Pratos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pratosExibidos.map((prato) => (
          <Card
            key={prato.id}
            className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white rounded-[2rem]"
          >
            <div className="relative h-48 w-full bg-gray-50">
              <img
                src={prato.imagem ?? ""}
                alt={prato.nome ?? "Prato"}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                <span className="text-[#4A7C44] font-bold text-sm">
                  R$ {prato.preco.toFixed(2)}
                </span>
              </div>
            </div>

            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-1">
                {prato.nome}
              </h2>
              <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                {prato.descricao}
              </p>

              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < (prato.nota ?? 5)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  {prato.categoria}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}