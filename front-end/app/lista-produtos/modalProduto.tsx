"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoriaPrato, Prato } from "../schemas/cardapioSchemas";

interface ModalProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prato: Partial<Prato>) => void;
  pratoParaEditar?: Prato | null;
}

export default function ModalProduto({
  isOpen,
  onClose,
  onSave,
  pratoParaEditar,
}: ModalProdutoProps) {
  const [formData, setFormData] = useState<Partial<Prato>>({
    nome: "",
    descricao: "",
    preco: 0,
    nota: 5,
    categoria: "REFEICAO",
    imagem: "",
  });

  useEffect(() => {
    if (pratoParaEditar) setFormData(pratoParaEditar);
    else
      setFormData({
        nome: "",
        descricao: "",
        preco: 0,
        nota: 5,
        categoria: "REFEICAO",
        imagem: "",
      });
  }, [pratoParaEditar, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#F5F5ED]">
        <DialogHeader>
          <DialogTitle className="text-[#4A7C44] text-2xl font-bold">
            {pratoParaEditar ? "Editar Prato" : "Novo Prato"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome do Prato</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="preco">Preço ($)</Label>
            <Input
              id="preco"
              type="number"
              value={formData.preco}
              onChange={(e) =>
                setFormData({ ...formData, preco: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Categoria</Label>
            <Select
              value={formData.categoria}
              onValueChange={(val: CategoriaPrato) =>
                setFormData({ ...formData, categoria: val })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="REFEICAO">Refeição</SelectItem>
                <SelectItem value="SOBREMESA">Sobremesa</SelectItem>
                <SelectItem value="ACOMPANHAMENTO">
                  Acompanhamento/Bebida
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desc">Descrição</Label>
            <Textarea
              id="desc"
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            className="bg-[#4A7C44] hover:bg-[#3d6638]"
            onClick={() => onSave(formData)}
          >
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
