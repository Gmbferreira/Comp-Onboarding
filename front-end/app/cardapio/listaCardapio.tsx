"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Star,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
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
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const pratosExibidos = pratosFiltrados.slice(inicio, inicio + itensPorPagina);

  useEffect(() => {
    setPaginaAtual(1);
  }, [filtro]);

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#4A7C44]" size={48} />
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      {/* Filtros: Alinhados à esquerda para começar junto com o topo da lista de pedidos */}
      <div className="flex overflow-x-auto lg:flex-wrap justify-start gap-2 lg:gap-4 mb-8 lg:mb-12 pb-4 no-scrollbar">
        {["TODOS", "REFEICAO", "SOBREMESA", "BEBIDA"].map((cat) => (
          <Button
            key={cat}
            onClick={() => setFiltro(cat as any)}
            variant="outline"
            className={`rounded-full px-4 lg:px-10 py-4 lg:py-6 text-sm lg:text-lg border-none shadow-sm shrink-0 ${
              filtro === cat
                ? "bg-[#4A7C44] text-white"
                : "bg-white text-black hover:bg-green-50"
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

      {/* Grid de Pratos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {pratosExibidos.map((prato) => (
          <Card
            key={prato.id}
            className="border-none shadow-sm lg:shadow-md overflow-hidden bg-white rounded-lg lg:rounded-xl"
          >
            <div className="relative h-48 lg:h-56 w-full bg-gray-100">
              {prato.imagem ? (
                <img
                  src={prato.imagem}
                  alt={prato.nome}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="text-gray-300" size={48} />
                </div>
              )}
            </div>

            <CardContent className="p-4 lg:p-5">
              <div className="flex flex-col lg:flex-row justify-between lg:items-start mb-1">
                <h2 className="text-base lg:text-xl font-bold text-[#4A7C44] truncate">
                  {prato.nome}
                </h2>
                <span className="font-bold text-gray-700 text-sm lg:text-base">
                  ${prato.preco.toFixed(2)}
                </span>
              </div>

              <p className="hidden lg:block text-sm text-[#8BAE86] leading-snug mb-4 h-10 line-clamp-2">
                {prato.descricao}
              </p>

              <div className="flex justify-between items-center mt-2 lg:mt-0">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < (prato.nota ?? 5)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <Button
                  size="icon"
                  className="bg-[#f3f3f3] hover:bg-[#e6e6e6] rounded-md lg:rounded-lg h-8 w-8 lg:h-9 lg:w-9"
                  onClick={() =>
                    onAdicionarItem({
                      idPrato: prato.id,
                      nome: prato.nome,
                      preco: prato.preco,
                      quantidade: 1,
                    })
                  }
                >
                  <ShoppingBag className="text-black w-4 h-4 lg:w-5 lg:h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <Button
            variant="ghost"
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual((prev) => prev - 1)}
          >
            <ChevronLeft size={24} />
          </Button>
          <span className="font-bold text-lg text-gray-700">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <Button
            variant="ghost"
            disabled={paginaAtual === totalPaginas}
            onClick={() => setPaginaAtual((prev) => prev + 1)}
          >
            <ChevronRight size={24} />
          </Button>
        </div>
      )}
    </div>
  );
}
