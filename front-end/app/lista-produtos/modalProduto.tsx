"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Upload, X } from "lucide-react";

export interface PratoFormData extends Partial<Prato> {
  arquivoImagem?: File;
}

interface ModalProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prato: PratoFormData) => void;
  pratoParaEditar?: Prato | null;
}

export default function ModalProduto({
  isOpen,
  onClose,
  onSave,
  pratoParaEditar,
}: ModalProdutoProps) {
  const [formData, setFormData] = useState<PratoFormData>({
    nome: "",
    descricao: "",
    preco: 0,
    categoria: "REFEICAO",
    imagem: "",
  });

  useEffect(() => {
    if (pratoParaEditar) {
      setFormData(pratoParaEditar);
    } else {
      setFormData({
        nome: "",
        descricao: "",
        preco: 0,
        categoria: "REFEICAO",
        imagem: "",
      });
    }
  }, [pratoParaEditar, isOpen]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          arquivoImagem: file,
          imagem: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] bg-[#F5F5ED] rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-[#4A7C44] text-2xl font-bold">
            {pratoParaEditar ? "Editar Prato" : "Novo Prato"}
          </DialogTitle>
          <DialogDescription>
            Preencha os detalhes do prato. A imagem será salva no servidor.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                className="bg-white"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input
                id="preco"
                type="number"
                className="bg-white"
                value={formData.preco}
                onChange={(e) =>
                  setFormData({ ...formData, preco: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Categoria</Label>
            <Select
              value={formData.categoria}
              onValueChange={(val: CategoriaPrato) =>
                setFormData({ ...formData, categoria: val })
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="REFEICAO">Refeição</SelectItem>
                <SelectItem value="SOBREMESA">Sobremesa</SelectItem>
                <SelectItem value="BEBIDA">Bebida</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Imagem do Produto</Label>
            <div className="flex flex-col items-center gap-4">
              {formData.imagem ? (
                <div className="relative w-full h-40 rounded-xl overflow-hidden border">
                  <img
                    src={formData.imagem}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        imagem: "",
                        arquivoImagem: undefined,
                      })
                    }
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <label className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed rounded-xl bg-white cursor-pointer hover:bg-gray-50">
                  <Upload className="text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Clique para subir foto
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="desc">Descrição</Label>
            <Textarea
              id="desc"
              className="bg-white resize-none"
              rows={3}
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
            {pratoParaEditar ? "Salvar Alterações" : "Cadastrar Prato"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
