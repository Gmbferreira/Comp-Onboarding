"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Mail, Lock, Loader2, UserCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_ROUTES } from "../config/api-routes";
import { LoginData, loginSchema } from "../schemas/usuarioSchema";


export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onLogin = async (data: LoginData) => {
    setLoading(true);
    try {
      
      const resCliente = await fetch(API_ROUTES.auth.cliente.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (resCliente.ok) {
        const cliente = await resCliente.json();
        
        
        if (cliente.id) {
          Cookies.set("auth-token", String(cliente.id), { expires: 7 });
          Cookies.set("user-role", "CLIENTE", { expires: 7 });
          Cookies.set("user-name", cliente.nome, { expires: 7 });
        }

        toast.success(`Bem-vindo, ${cliente.nome}!`, { position: "top-center" });
        reset();
        router.push("/landing-page");
        return;
      }

      
      const resAdmin = await fetch(API_ROUTES.auth.admin.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (resAdmin.ok) {
        const admin = await resAdmin.json();

        if (admin.id) {
          Cookies.set("auth-token", String(admin.id), { expires: 7 });
          Cookies.set("user-role", "ADMIN", { expires: 7 });
          Cookies.set("user-name", admin.nome, { expires: 7 });
        }

        toast.success(`Acesso administrativo: ${admin.nome}`, { position: "top-center" });
        reset();
        router.push("/lista-produtos");
        return;
      }

      
      throw new Error("E-mail ou senha incorretos.");

    } catch (error: any) {
      
      const isNetworkError = error.name === "TypeError" && error.message.includes("fetch");
      
      toast.error(
        isNetworkError ? "Servidor indisponível. Verifique sua conexão." : error.message, 
        { position: "top-center" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <UserCircle2 className="w-24 h-24 text-gray-400 mb-8" />

      <form onSubmit={handleSubmit(onLogin)} className="w-full space-y-5">
        {/* Campo E-mail */}
        <div className="space-y-1">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              {...register("email")}
              type="email"
              placeholder="E-mail"
              className="pl-12 py-6 rounded-2xl border-none bg-white/80 focus-visible:ring-[#4A7C44] transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-[10px] font-bold uppercase px-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Campo Senha */}
        <div className="space-y-1">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              {...register("senha")}
              type="password"
              placeholder="Senha"
              className="pl-12 py-6 rounded-2xl border-none bg-white/80 focus-visible:ring-[#4A7C44] transition-all"
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
          className="w-full bg-[#4A7C44] hover:bg-[#3d6638] text-white py-7 rounded-2xl text-lg font-medium shadow-lg transition-all active:scale-[0.98]"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Autenticando...</span>
            </div>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </div>
  );
}