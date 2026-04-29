"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MapPin } from "lucide-react"; // Importei MapPin para o ícone
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ItemPedido, PedidoEnvio } from "../schemas/pedidosSchemas";
import { API_ROUTES } from "../config/api-routes";

interface ListaPedidosProps {
  itens: ItemPedido[];
  setItens: React.Dispatch<React.SetStateAction<ItemPedido[]>>;
}

export default function ListaPedidos({ itens, setItens }: ListaPedidosProps) {
  const [endereco, setEndereco] = useState("");
  const taxaEntrega = 10.0;

  const subtotal = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0,
  );
  const total = subtotal > 0 ? subtotal + taxaEntrega : 0;

  useEffect(() => {
    async function buscarEnderecoUsuario() {
      const usuarioSalvo = localStorage.getItem("usuarioLogado");
      if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);

        if (usuario.endereco) {
          setEndereco(usuario.endereco);
        } else {
          try {
            const res = await fetch(
              `${API_ROUTES.auth.cliente.login}?email=${usuario.email}`,
            );
            if (res.ok) {
              const data = await res.json();
              if (data.endereco) setEndereco(data.endereco);
            }
          } catch (err) {
            console.error("Erro ao buscar endereço atualizado", err);
          }
        }
      }
    }
    buscarEnderecoUsuario();
  }, []);

  const alterarQuantidade = (id: number, delta: number) => {
    setItens((prev) =>
      prev
        .map((item) =>
          item.idPrato === id
            ? { ...item, quantidade: Math.max(0, item.quantidade + delta) }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  };

  const finalizarPedido = async () => {
    if (itens.length === 0) {
      toast.error("Seu pedido está vazio!");
      return;
    }

    if (!endereco || endereco.trim() === "") {
      toast.error("Por favor, informe um endereço para entrega.");
      return;
    }

    const pedido: any = {
      itens,
      subtotal,
      taxaEntrega,
      total,
      endereco,
    };

    try {
      const res = await fetch(API_ROUTES.pedidos.create, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (!res.ok) throw new Error("Erro no servidor");

      toast.success("Pedido confirmado! Já estamos preparando sua refeição.");
      setItens([]);
    } catch (err) {
      toast.warning("Servidor offline. O pedido foi logado no console.");
      console.log("Simulação de Envio:", pedido);
    }
  };

  return (
    <aside className="bg-[#D1E7D3] rounded-3xl p-6 h-fit sticky top-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white p-2 rounded-lg relative">
          <ShoppingBag size={24} className="text-black" />
          <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
            {itens.length}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Seu Pedido</h2>
      </div>

      {/* Lista de Itens */}
      <div className="space-y-6 mb-8 min-h-[50px] max-h-[300px] overflow-y-auto no-scrollbar">
        {itens.length === 0 && (
          <p className="text-gray-500 text-sm italic text-center">
            Nenhum item selecionado
          </p>
        )}

        {itens.map((item) => (
          <div key={item.idPrato} className="border-b border-green-200 pb-4">
            <div className="flex justify-between font-bold text-gray-700 mb-2">
              <span>{item.nome}</span>
              <span>${(item.preco * item.quantidade).toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-3 text-lg font-bold">
              <button
                onClick={() => alterarQuantidade(item.idPrato, -1)}
                className="hover:text-green-700 font-mono"
              >
                [-]
              </button>
              <span>{item.quantidade}</span>
              <button
                onClick={() => alterarQuantidade(item.idPrato, 1)}
                className="hover:text-green-700 font-mono"
              >
                [+]
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 p-4 bg-white/50 rounded-2xl border border-green-200">
        <div className="flex items-center gap-2 mb-2 text-[#4A7C44] font-bold">
          <MapPin size={18} />
          <Label htmlFor="endereco">Endereço de Entrega</Label>
        </div>
        <Input
          id="endereco"
          placeholder="Rua, número, bairro..."
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className="bg-white border-none rounded-xl focus-visible:ring-[#4A7C44]"
        />
      </div>

      <div className="space-y-3 text-gray-700 font-semibold border-t border-green-300 pt-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxa de Entrega</span>
          <span>${taxaEntrega.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-black pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={finalizarPedido}
        className="w-full mt-8 bg-[#6CB471] hover:bg-[#5da162] text-white rounded-full py-7 text-xl font-bold shadow-lg"
      >
        Confirmar Pedido
      </Button>
    </aside>
  );
}
