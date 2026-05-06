"use client";

import React, { useState, useEffect } from "react";
import { Plus, Loader2, ImageIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Prato, PratoFormData } from "../schemas/cardapioSchemas";
import { API_ROUTES } from "../config/api-routes";
import ModalProduto from "./modalProduto";

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
      console.error("Erro detalhado:", err);
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

  if (carregando)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-[#4A7C44]" size={48} />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <Button
          onClick={() => {
            setProdutoEmEdicao(null);
            setModalAberto(true);
          }}
          className="bg-gray-400 hover:bg-gray-500 text-black font-bold px-8 py-6 rounded-md"
        >
          Adicionar Prato
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {produtos.map((prato) => (
          <Card
            key={prato.id}
            className={`overflow-hidden border-none shadow-md bg-white flex flex-col ${!prato.ativo ? "opacity-60" : ""}`}
          >
            <div className="relative h-48 bg-gray-100">
              {prato.imagem ? (
                <img
                  src={prato.imagem}
                  className="w-full h-full object-cover"
                  alt={prato.nome}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="text-gray-300" size={40} />
                </div>
              )}
            </div>

            <CardContent className="p-4 flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-lg truncate">{prato.nome}</h3>
                <span className="font-bold text-[#4A7C44]">
                  R$ {prato.preco.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 h-8">
                {prato.descricao}
              </p>
              <div className="flex gap-0.5 mt-2">
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
            </CardContent>

            <CardFooter className="p-4 pt-0 flex flex-wrap gap-x-4 gap-y-2 border-t mt-4 text-sm font-bold">
              <button
                onClick={() => {
                  setProdutoEmEdicao(prato);
                  setModalAberto(true);
                }}
                className="hover:underline text-black"
              >
                Editar
              </button>
              <button
                onClick={() => handleToggleStatus(prato)}
                className="hover:underline text-black"
              >
                {prato.ativo ? "Pausar" : "Ativar"} produto
              </button>
              <button
                onClick={() => handleRemover(prato.id)}
                className="hover:underline text-red-600 ml-auto"
              >
                Remover
              </button>
            </CardFooter>
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
