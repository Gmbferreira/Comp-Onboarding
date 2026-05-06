"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
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

  const pratosFiltrados =
    filtro === "TODOS"
      ? todosPratos
      : todosPratos.filter((p) => p.categoria === filtro);

  const totalPaginas = Math.ceil(pratosFiltrados.length / itensPorPagina);
  const pratosExibidos = pratosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina,
  );

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#4A7C44]" size={48} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0 lg:px-4 pb-20">
      <h1 className="text-center text-3xl lg:text-5xl font-bold py-8 lg:py-12 text-[#1a1a1a] uppercase tracking-widest">
        Cardápio
      </h1>

      <div className="flex overflow-x-auto lg:flex-wrap justify-start lg:justify-center gap-2 lg:gap-4 mb-8 lg:mb-16 pb-4 no-scrollbar">
        {["TODOS", "REFEICAO", "SOBREMESA", "BEBIDA"].map((cat) => (
          <Button
            key={cat}
            onClick={() => {
              setFiltro(cat as any);
              setPaginaAtual(1);
            }}
            variant="outline"
            className={`rounded-full px-6 lg:px-10 py-4 lg:py-6 text-sm lg:text-lg border-none shadow-sm ${
              filtro === cat
                ? "bg-[#4A7C44] text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {cat === "TODOS"
              ? "Todos"
              : cat === "REFEICAO"
                ? "Pratos"
                : cat === "SOBREMESA"
                  ? "Sobremesas"
                  : "Bebidas"}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {pratosExibidos.map((prato) => (
          <Card
            key={prato.id}
            className="border-none shadow-md overflow-hidden bg-white rounded-3xl"
          >
            <div className="relative h-48 lg:h-56 w-full">
              <img
                src={prato.imagem}
                alt={prato.nome}
                className="w-full h-full object-cover"
              />
            </div>

            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-bold text-[#1a1a1a]">
                  {prato.nome}
                </h2>
                <span className="font-bold text-[#4A7C44]">
                  R$ {prato.preco.toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-4 line-clamp-2">
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
