"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie"; 
import { toast } from "sonner";
import { Phone, Lock, User, Loader2, UserCircle2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_ROUTES } from "../config/api-routes";
import { CadastroData, cadastroSchema } from "../schemas/usuarioSchema";

export default function CadastroForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CadastroData>({
    resolver: zodResolver(cadastroSchema),
  });

  const onCadastro = async (data: CadastroData) => {
    setLoading(true);
    try {
      const res = await fetch(API_ROUTES.auth.cliente.registro, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      
      const clienteSalvo = await res.json();

      if (!res.ok) {
        
        throw new Error(clienteSalvo || "Erro ao realizar cadastro.");
      }


      if (clienteSalvo.id) {
        Cookies.set("auth-token", String(clienteSalvo.id), { expires: 7 });
        Cookies.set("user-role", "CLIENTE", { expires: 7 });
        Cookies.set("user-name", clienteSalvo.nome, { expires: 7 });
      }

      toast.success(`Bem-vindo, ${clienteSalvo.nome}! Conta criada com sucesso.`, { 
        position: "top-center" 
      });
      
      reset(); 
      router.push("/landing-page"); 
      
    } catch (error: any) {
      const isNetworkError = error.name === "TypeError" && error.message.includes("fetch");
      
      toast.error(
        isNetworkError ? "Servidor indisponível. Tente mais tarde." : (error.message || "Erro ao cadastrar."),
        { position: "top-center" }
      );
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
          {errors.nome && (
            <p className="text-red-500 text-[10px] font-bold uppercase px-2">
              {errors.nome.message}
            </p>
          )}
        </div>

        {/* E-mail */}
        <div className="space-y-1">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              {...register("email")} 
              type="email"
              placeholder="E-mail" 
              className="pl-12 py-6 rounded-2xl border-none bg-white/80 focus-visible:ring-[#4A7C44]" 
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-[10px] font-bold uppercase px-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Telefone */}
        <div className="space-y-1">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              {...register("telefone")} 
              placeholder="Celular" 
              className="pl-12 py-6 rounded-2xl border-none bg-white/80 focus-visible:ring-[#4A7C44]" 
            />
          </div>
          {errors.telefone && (
            <p className="text-red-500 text-[10px] font-bold uppercase px-2">
              {errors.telefone.message}
            </p>
          )}
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
          {errors.senha && (
            <p className="text-red-500 text-[10px] font-bold uppercase px-2">
              {errors.senha.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4A7C44] hover:bg-[#3d6638] text-white py-7 rounded-2xl text-lg font-medium shadow-lg mt-4 transition-all active:scale-[0.98]"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Criando conta...</span>
            </div>
          ) : (
            "Confirmar"
          )}
        </Button>
      </form>
    </div>
  );
}