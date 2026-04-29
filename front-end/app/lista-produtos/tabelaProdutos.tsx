"use client";

import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Prato } from "../schemas/cardapioSchemas";
import { API_ROUTES } from "../config/api-routes";
import ModalProduto, { PratoFormData } from "./modalProduto";

export default function TabelaProdutos() {
  const [produtos, setProdutos] = useState<Prato[]>([]);
  const [carregando, setCarregando] = useState(true);
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
    const url = isEdicao
      ? API_ROUTES.pratos.getById(produtoEmEdicao!.id)
      : API_ROUTES.pratos.list;
    const metodo = isEdicao ? "PATCH" : "POST";

    const formData = new FormData();

    const { arquivoImagem, imagem, ...dadosParaOBackend } = dados;

    const pratoBlob = new Blob([JSON.stringify(dadosParaOBackend)], {
      type: "application/json",
    });

    formData.append("prato", pratoBlob);

    if (arquivoImagem) {
      formData.append("file", arquivoImagem);
    }

    try {
      const res = await fetch(url, {
        method: metodo,
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Erro no servidor");
      }

      const data = await res.json();
      toast.success(isEdicao ? "Prato atualizado!" : "Prato criado!");

      if (isEdicao) {
        setProdutos((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      } else {
        setProdutos((prev) => [data, ...prev]);
      }

      setModalAberto(false);
    } catch (err: any) {
      console.error("Erro no salvamento:", err);
      toast.error(`Falha ao salvar: ${err.message}`);
    }
  };

  const handleRemover = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    try {
      const res = await fetch(API_ROUTES.pratos.getById(id), {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setProdutos((prev) => prev.filter((p) => p.id !== id));
      toast.success("Removido com sucesso!");
    } catch {
      toast.error("Erro ao remover do servidor.");
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
    <div className="bg-white rounded-3xl shadow-sm p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Gerenciar Produtos</h2>
        <Button
          onClick={() => {
            setProdutoEmEdicao(null);
            setModalAberto(true);
          }}
          className="bg-[#4A7C44] rounded-full gap-2"
        >
          <Plus size={20} /> Novo Prato
        </Button>
      </div>

      <div className="space-y-3">
        {produtos.map((prato) => (
          <div
            key={prato.id}
            className="flex items-center justify-between p-4 border rounded-2xl hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border">
                {prato.imagem ? (
                  <img
                    src={prato.imagem}
                    className="w-full h-full object-cover"
                    alt={prato.nome}
                  />
                ) : (
                  <ImageIcon className="m-auto mt-4 text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="font-bold">{prato.nome}</h3>
                <p className="text-sm text-gray-500">
                  R$ {prato.preco.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setProdutoEmEdicao(prato);
                  setModalAberto(true);
                }}
                className="text-blue-600"
              >
                <Edit size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemover(prato.id)}
                className="text-red-500"
              >
                <Trash2 size={20} />
              </Button>
            </div>
          </div>
        ))}
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
