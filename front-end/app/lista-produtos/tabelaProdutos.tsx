"use client";

import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Prato } from "../schemas/cardapioSchemas";
import { API_ROUTES } from "../config/api-routes";
import { mockPratos } from "../mocks/cardapioMock";
import ModalProduto from "./modalProduto";

export default function TabelaProdutos() {
  const [produtos, setProdutos] = useState<Prato[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<Prato | null>(null);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const res = await fetch(API_ROUTES.pratos.list);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProdutos(data);
      } catch {
        console.warn("Usando mocks na listagem de produtos");
        setProdutos(mockPratos);
      } finally {
        setCarregando(false);
      }
    }
    carregarProdutos();
  }, []);

  const handleSalvar = async (dados: Partial<Prato>) => {
    const isEdicao = !!produtoEmEdicao;
    const url = isEdicao
      ? API_ROUTES.pratos.getById(produtoEmEdicao!.id)
      : API_ROUTES.pratos.list;
    const metodo = isEdicao ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!res.ok) throw new Error("Erro ao salvar no servidor");

      const data = await res.json();
      toast.success(
        isEdicao
          ? "Alterações salvas no servidor!"
          : "Prato criado no servidor!",
      );

      if (isEdicao) {
        setProdutos((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      } else {
        setProdutos((prev) => [data, ...prev]);
      }
    } catch (err) {
      console.warn(
        `Backend offline ao tentar ${isEdicao ? "editar" : "criar"}. Usando Mock.`,
      );

      if (isEdicao) {
        setProdutos((prev) =>
          prev.map((p) =>
            p.id === produtoEmEdicao.id ? { ...p, ...dados } : p,
          ),
        );
        toast.info("Modo Simulação: Atualizado apenas localmente.");
      } else {
        const novoMock = {
          ...dados,
          id: Math.floor(Math.random() * 1000),
          nota: 5,
          imagem: dados.imagem || "https://via.placeholder.com/150",
        } as Prato;

        setProdutos((prev) => [novoMock, ...prev]);
        toast.info("Modo Simulação: Novo prato criado localmente.");
      }
    } finally {
      setModalAberto(false);
    }
  };

  const handleRemover = async (id: number) => {
    try {
      const res = await fetch(API_ROUTES.pratos.getById(id), {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro no servidor");

      setProdutos((prev) => prev.filter((p) => p.id !== id));
      toast.success("Prato removido do servidor com sucesso!");
    } catch (err) {
      console.warn("Backend offline ao tentar remover. Executando via Mock.");

      setProdutos((prev) => prev.filter((p) => p.id !== id));
      toast.warning(
        "Servidor indisponível. Item removido apenas localmente (Mock).",
      );
    }
  };

  if (carregando) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-[#4A7C44]" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Gerenciar Produtos
          </h2>
          <p className="text-gray-500">
            Adicione, edite ou remova pratos do sistema.
          </p>
        </div>
        <Button
          onClick={() => {
            setProdutoEmEdicao(null);
            setModalAberto(true);
          }}
          className="bg-[#4A7C44] hover:bg-[#3d6638] rounded-full px-6 py-6 text-lg gap-2 transition-all shadow-md"
        >
          <Plus size={20} /> Novo Prato
        </Button>
      </div>

      <div className="space-y-3">
        {produtos.map((prato) => (
          <div
            key={prato.id}
            className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-[#F5F5ED]/50 transition-all group"
          >
            <div className="flex items-center gap-5 w-full sm:w-auto">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                {prato.imagem ? (
                  <img
                    src={prato.imagem}
                    alt={prato.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageIcon size={24} />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-gray-800">
                    {prato.nome}
                  </h3>
                  <span className="text-[10px] bg-[#D1E7D3] text-[#4A7C44] px-2 py-0.5 rounded-full font-bold uppercase">
                    {prato.categoria}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-1 max-w-md">
                  {prato.descricao}
                </p>
                <p className="font-bold text-[#4A7C44] mt-1">
                  R$ {prato.preco.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto justify-end border-t sm:border-none pt-3 sm:pt-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setProdutoEmEdicao(prato);
                  setModalAberto(true);
                }}
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl"
              >
                <Edit size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemover(prato.id)}
                className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl"
              >
                <Trash2 size={20} />
              </Button>
            </div>
          </div>
        ))}

        {produtos.length === 0 && (
          <div className="text-center py-20 text-gray-400 italic">
            Nenhum produto cadastrado no momento.
          </div>
        )}
      </div>

      <ModalProduto
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSave={handleSalvar}
        pratoParaEditar={produtoEmEdicao}
      />
    </div>
  );
}
