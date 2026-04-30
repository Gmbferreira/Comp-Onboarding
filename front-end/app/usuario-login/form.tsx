"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Lock, Loader2, UserCircle2 } from "lucide-react";
import { API_ROUTES } from "../config/api-routes";

const loginSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  senha: z.string().min(1, "A senha é obrigatória"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onLogin = async (data: LoginData) => {
    setLoading(true);
    try {
      // Tentativa de login como Cliente
      const resCliente = await fetch(API_ROUTES.auth.cliente.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (resCliente.ok) {
        const cliente = await resCliente.json();
        toast.success(`Bem-vindo, ${cliente.nome}!`);
        router.push("/landing-page");
        return;
      }

      // Tentativa de login como Admin
      const resAdmin = await fetch(API_ROUTES.auth.admin.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (resAdmin.ok) {
        const admin = await resAdmin.json();
        toast.success(`Acesso administrativo: ${admin.nome}`);
        router.push("/lista-produtos");
        return;
      }

      throw new Error("E-mail ou senha incorretos.");
    } catch (error: any) {
      toast.error(error.message || "Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <UserCircle2 className="w-24 h-24 text-gray-400 mb-8" />
      
      <form onSubmit={handleSubmit(onLogin)} className="w-full space-y-5">
        <div className="space-y-1">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              {...register("email")}
              placeholder="E-mail"
              className="pl-12 py-6 rounded-2xl border-none bg-white/80 focus-visible:ring-[#4A7C44]"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs px-2">{errors.email.message}</p>}
        </div>

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
          {errors.senha && <p className="text-red-500 text-xs px-2">{errors.senha.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4A7C44] hover:bg-[#3d6638] text-white py-7 rounded-2xl text-lg font-medium shadow-lg transition-all"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Entrar"}
        </Button>
      </form>
    </div>
  );
}