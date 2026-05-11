"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Loader2, 
  ImageIcon, 
  Pencil, 
  PauseCircle, 
  PlayCircle, 
  MoreHorizontal, 
  LayoutGrid, 
  Soup, 
  Dessert, 
  Coffee, 
  Camera,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Prato, PratoFormData, CategoriaPrato } from "../schemas/cardapioSchemas";
import { API_ROUTES } from "../config/api-routes";
import ModalProduto from "./modalProduto";

export default function TabelaProdutos() {
  const [produtos, setProdutos] = useState<Prato[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState<CategoriaPrato | "TODOS">("TODOS");
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<Prato | null>(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      const res = await fetch(API_ROUTES.pratos.list);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      toast.error("Erro ao carregar produtos do servidor.");
    } finally {
      setCarregando(false);
    }
  }

  const handleSalvar = async (dados: PratoFormData) => {
    const isEdicao = !!produtoEmEdicao;
    const metodo = isEdicao ? "PATCH" : "POST";
    const url = isEdicao
      ? `${API_ROUTES.pratos.list}/${produtoEmEdicao.id}`
      : API_ROUTES.pratos.list;

    try {
      const formData = new FormData();
      const { arquivoImagem, imagem, ...corpoRequest } = dados;

      const payload = {
        ...corpoRequest,
        id: isEdicao ? produtoEmEdicao.id : undefined,
        preco: Number(corpoRequest.preco),
        nota: Number(corpoRequest.nota || 5),
      };

      const pratoBlob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });

      formData.append("prato", pratoBlob);

      if (arquivoImagem instanceof File) {
        formData.append("file", arquivoImagem);
      }

      const res = await fetch(url, {
        method: metodo,
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Erro interno no servidor");
      }

      const pratoAtualizado = await res.json();
      toast.success(isEdicao ? "Prato atualizado!" : "Prato criado!");

      if (isEdicao) {
        setProdutos((prev) =>
          prev.map((p) => (p.id === pratoAtualizado.id ? pratoAtualizado : p)),
        );
      } else {
        setProdutos((prev) => [pratoAtualizado, ...prev]);
      }

      setModalAberto(false);
      setProdutoEmEdicao(null);
    } catch (err: any) {
      toast.error(`Falha: ${err.message}`);
    }
  };

  const handleToggleStatus = async (prato: Prato) => {
    const url = prato.ativo
      ? `${API_ROUTES.pratos.list}/${prato.id}/desativar`
      : `${API_ROUTES.pratos.list}/${prato.id}/ativar`;

    try {
      const res = await fetch(url, { method: "PATCH" });
      if (!res.ok) throw new Error();
      const pratoAtualizado = await res.json();
      setProdutos((prev) =>
        prev.map((p) => (p.id === prato.id ? pratoAtualizado : p)),
      );
      toast.success(prato.ativo ? "Produto pausado!" : "Produto ativado!");
    } catch {
      toast.error("Erro ao alterar status.");
    }
  };

  const handleRemover = async (id: number) => {
    if (!confirm("Excluir permanentemente?")) return;
    try {
      const res = await fetch(`${API_ROUTES.pratos.list}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setProdutos((prev) => prev.filter((p) => p.id !== id));
      toast.success("Removido com sucesso!");
    } catch {
      toast.error("Erro ao remover.");
    }
  };

  const categorias = [
    { id: "TODOS", label: "Todos", icon: <LayoutGrid className="h-4 w-4" /> },
    { id: "REFEICAO", label: "Pratos", icon: <Soup className="h-4 w-4" /> },
    { id: "SOBREMESA", label: "Sobremesas", icon: <Dessert className="h-4 w-4" /> },
    { id: "BEBIDA", label: "Bebidas", icon: <Coffee className="h-4 w-4" /> },
  ];

  const produtosFiltrados = filtro === "TODOS" 
    ? produtos 
    : produtos.filter(p => p.categoria === filtro);

  if (carregando)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-[#4A7C44]" size={48} />
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Header: Filtros e Botão Adicionar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex overflow-x-auto gap-3 no-scrollbar pb-2">
          {categorias.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => setFiltro(cat.id as any)}
              className={`rounded-full px-6 py-6 flex gap-3 shadow-sm transition-all duration-300 border-none ${
                filtro === cat.id
                  ? "bg-[#2D4A26] text-white hover:bg-[#233a1e]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {cat.icon}
              <span className="font-semibold text-sm">{cat.label}</span>
            </Button>
          ))}
        </div>

        <Button
          onClick={() => {
            setProdutoEmEdicao(null);
            setModalAberto(true);
          }}
          className="bg-[#4A7C44] hover:bg-[#3d6638] text-white font-bold px-6 py-7 rounded-2xl flex gap-2 shadow-lg transition-transform active:scale-95 shrink-0"
        >
          <Plus size={20} />
          Adicionar Produto
        </Button>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {produtosFiltrados.map((prato) => (
          <Card
            key={prato.id}
            className={`overflow-hidden border-none shadow-xl bg-white flex flex-col rounded-[2.5rem] transition-all duration-300 ${
              !prato.ativo ? "opacity-60 grayscale-[0.5]" : "hover:shadow-2xl"
            }`}
          >
            {/* Container da Imagem */}
            <div className="relative h-52 bg-gray-50">
              {prato.imagem ? (
                <img
                  src={prato.imagem}
                  className="w-full h-full object-cover"
                  alt={prato.nome}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="text-gray-200" size={48} />
                </div>
              )}

              {/* Menu de Opções (Três pontos) */}
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white rounded-full h-8 w-8 shadow-sm">
                      <MoreHorizontal size={18} className="text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem 
                      className="text-red-600 focus:text-red-600 cursor-pointer"
                      onClick={() => handleRemover(prato.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Botão Editar Foto (Overlay) */}
              <button 
                onClick={() => {
                  setProdutoEmEdicao(prato);
                  setModalAberto(true);
                }}
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white px-3 py-1.5 rounded-xl shadow-md text-gray-700 text-[10px] font-bold flex items-center gap-1.5 transition-colors"
              >
                <Camera size={14} className="text-gray-500" />
                Editar foto
              </button>
            </div>

            {/* Conteúdo do Card */}
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="font-bold text-gray-800 text-lg leading-tight truncate">
                  {prato.nome}
                </h3>
                <span className="font-bold text-[#4A7C44] text-lg whitespace-nowrap">
                  R$ {prato.preco.toFixed(2)}
                </span>
              </div>
              
              <p className="text-xs text-gray-400 line-clamp-2 h-8 leading-relaxed mb-6">
                {prato.descricao}
              </p>

              {/* Ações Inferiores */}
              <div className="flex items-center gap-2 border-t border-gray-50 pt-4 mt-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setProdutoEmEdicao(prato);
                    setModalAberto(true);
                  }}
                  className="flex-1 flex gap-2 text-gray-600 font-bold hover:bg-gray-50 rounded-xl"
                >
                  <Pencil size={16} className="text-[#4A7C44]" />
                  Editar
                </Button>

                <div className="w-[1px] h-6 bg-gray-100" />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleStatus(prato)}
                  className={`flex-1 flex gap-2 font-bold rounded-xl transition-colors ${
                    prato.ativo 
                      ? "text-red-500 hover:bg-red-50 hover:text-red-600" 
                      : "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  {prato.ativo ? (
                    <><PauseCircle size={16} /> Pausar</>
                  ) : (
                    <><PlayCircle size={16} /> Ativar</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> 

      <ModalProduto
        isOpen={modalAberto}
        onClose={() => {
          setModalAberto(false);
          setProdutoEmEdicao(null);
        }}
        onSave={handleSalvar}
        pratoParaEditar={produtoEmEdicao}
      />
    </div>
  );
}