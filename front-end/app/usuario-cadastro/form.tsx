"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Phone, Lock, User, Loader2, UserCircle2, MapPin } from "lucide-react";
import { API_ROUTES } from "../config/api-routes";

const registroSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(10, "Telefone inválido (mínimo 10 dígitos)"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  cep: z.string().min(8, "CEP inválido").optional().or(z.literal('')),
  numero: z.string().optional(),
  complemento: z.string().optional(),
});

type RegistroData = z.infer<typeof registroSchema>;

export default function CadastroForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<RegistroData>({
    resolver: zodResolver(registroSchema),
  });

  const onCadastro = async (data: RegistroData) => {
    setLoading(true);
    try {
      const res = await fetch(API_ROUTES.auth.cliente.registro, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      toast.success("Conta criada com sucesso!");
      // Redireciona para a landing page conforme solicitado
      router.push("/landing-page");
    } catch (error: any) {
      toast.error(error.message || "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <UserCircle2 className="w-24 h-24 text-gray-400 mb-6" />
      
      <form onSubmit={handleSubmit(onCadastro)} className="w-full space-y-4">
        {/* Nome */}
        <div className="space-y-1">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              {...register("nome")} 
              placeholder="Nome Completo" 
              className="pl-12 py-6 rounded-2xl border-none bg-white/80 focus-visible:ring-[#4A7C44]" 
            />
          </div>
          {errors.nome && <p className="text-red-500 text-[10px] font-bold uppercase px-2">{errors.nome.message}</p>}
        </div>

        {/* Telefone / Celular */}
        <div className="space-y-1">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              {...register("telefone")} 
              placeholder="Celular" 
              className="pl-12 py-6 rounded-2xl border-none bg-white/80 focus-visible:ring-[#4A7C44]" 
            />
          </div>
          {errors.telefone && <p className="text-red-500 text-[10px] font-bold uppercase px-2">{errors.telefone.message}</p>}
        </div>

        {/* Senha */}
        <div className="space-y-1">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              {...register("senha")} 
              type="password" 
              placeholder="Senha" 
              className="pl-12 py-6 rounded-2xl border-none bg-white/80 focus-visible:ring-[#4A7C44]" 
            />
          </div>
          {errors.senha && <p className="text-red-500 text-[10px] font-bold uppercase px-2">{errors.senha.message}</p>}
        </div>

        {/* CEP */}
        <div className="space-y-1">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              {...register("cep")} 
              placeholder="CEP" 
              className="pl-12 py-6 rounded-2xl border-none bg-white/80 focus-visible:ring-[#4A7C44]" 
            />
          </div>
        </div>

        {/* Número e Complemento */}
        <div className="grid grid-cols-2 gap-4">
          <Input 
            {...register("numero")} 
            placeholder="Num" 
            className="py-6 rounded-2xl border-none bg-white/80 focus-visible:ring-[#4A7C44]" 
          />
          <Input 
            {...register("complemento")} 
            placeholder="Complemento" 
            className="py-6 rounded-2xl border-none bg-white/80 focus-visible:ring-[#4A7C44]" 
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4A7C44] hover:bg-[#3d6638] text-white py-7 rounded-2xl text-lg font-medium shadow-lg mt-4 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Confirmar"}
        </Button>
      </form>
    </div>
  );
}