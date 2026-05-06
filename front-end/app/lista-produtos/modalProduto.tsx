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
import {
  CategoriaPrato,
  Prato,
  PratoFormData,
} from "../schemas/cardapioSchemas";
import { Upload, X, Pencil } from "lucide-react";

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
    nota: 5,
    ativo: true,
  });

  useEffect(() => {
    if (pratoParaEditar) {
      setFormData({
        ...pratoParaEditar,
        arquivoImagem: undefined,
      });
    } else {
      setFormData({
        nome: "",
        descricao: "",
        preco: 0,
        categoria: "REFEICAO",
        imagem: "",
        nota: 5,
        ativo: true,
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
      <DialogContent className="sm:max-w-[450px] bg-[#F5F5ED] rounded-[2rem] border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#4A7C44] text-2xl font-bold">
            {pratoParaEditar ? "Editar Prato" : "Novo Prato"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Preencha os detalhes abaixo. A alteração da foto é feita passando o
            mouse sobre a imagem.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nome" className="font-bold">
                Nome
              </Label>
              <Input
                id="nome"
                className="bg-white rounded-xl border-none"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="preco" className="font-bold">
                Preço (R$)
              </Label>
              <Input
                id="preco"
                type="number"
                className="bg-white rounded-xl border-none"
                value={formData.preco}
                onChange={(e) =>
                  setFormData({ ...formData, preco: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="font-bold">Categoria</Label>
            <Select
              value={formData.categoria}
              onValueChange={(val: CategoriaPrato) =>
                setFormData({ ...formData, categoria: val })
              }
            >
              <SelectTrigger className="bg-white rounded-xl border-none">
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
            <Label className="font-bold">Imagem do Produto</Label>
            <div className="flex flex-col items-center gap-4">
              {formData.imagem ? (
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border group shadow-inner">
                  <img
                    src={formData.imagem}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />

                  {/* Botão Alterar Foto (Só aparece no hover) */}
                  <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="flex items-center gap-2 text-white font-bold bg-black/20 p-2 rounded-lg">
                      <Pencil size={18} />
                      Alterar Foto
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg"
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
                <label className="w-full h-44 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 font-medium">
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
            <Label htmlFor="desc" className="font-bold">
              Descrição
            </Label>
            <Textarea
              id="desc"
              className="bg-white rounded-xl border-none resize-none"
              rows={3}
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={onClose}
            className="rounded-xl font-bold"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            className="bg-[#4A7C44] hover:bg-[#3d6638] rounded-xl font-bold px-6"
            onClick={() => onSave(formData)}
          >
            {pratoParaEditar ? "Salvar Alterações" : "Cadastrar Prato"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
