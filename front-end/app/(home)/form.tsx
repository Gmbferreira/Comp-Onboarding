"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Mail, Lock, User, Phone, Loader2 } from "lucide-react";
import { API_ROUTES } from "../config/api-routes";

const loginSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  senha: z.string().min(1, "A senha é obrigatória"),
});

const registroSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(10, "Telefone inválido (mínimo 10 dígitos)"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;
type RegistroData = z.infer<typeof registroSchema>;

export default function FormLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const registroForm = useForm<RegistroData>({
    resolver: zodResolver(registroSchema),
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
        toast.success(`Bem-vindo, ${cliente.nome}!`);
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
      registroForm.reset();

      router.push("/landing-page");
    } catch (error: any) {
      toast.error(error.message || "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-[#D1E7D3] rounded-xl mb-6">
        <TabsTrigger
          value="login"
          className="data-[state=active]:bg-[#4A7C44] data-[state=active]:text-white"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="cadastro"
          className="data-[state=active]:bg-[#4A7C44] data-[state=active]:text-white"
        >
          Cadastro
        </TabsTrigger>
      </TabsList>

      {/* LOGIN */}
      <TabsContent value="login">
        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                {...loginForm.register("email")}
                type="email"
                placeholder="seu@email.com"
                className="pl-10"
              />
            </div>
            {loginForm.formState.errors.email && (
              <p className="text-red-500 text-[10px] font-bold uppercase">
                {loginForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="senha">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                {...loginForm.register("senha")}
                type="password"
                placeholder="••••••••"
                className="pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A7C44] hover:bg-[#3d6638] py-6 rounded-xl"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </TabsContent>

      {/* CADASTRO */}
      <TabsContent value="cadastro">
        <form
          onSubmit={registroForm.handleSubmit(onCadastro)}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="nome">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...registroForm.register("nome")}
                  placeholder="João Silva"
                  className="pl-10"
                />
              </div>
              {registroForm.formState.errors.nome && (
                <p className="text-red-500 text-[10px] font-bold uppercase">
                  {registroForm.formState.errors.nome.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="telefone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...registroForm.register("telefone")}
                  placeholder="(31) 9..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="reg-email">E-mail</Label>
            <Input
              {...registroForm.register("email")}
              type="email"
              placeholder="joao@email.com"
            />
            {registroForm.formState.errors.email && (
              <p className="text-red-500 text-[10px] font-bold uppercase">
                {registroForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="reg-senha">Senha</Label>
            <Input
              {...registroForm.register("senha")}
              type="password"
              placeholder="Mínimo 6 caracteres"
            />
            {registroForm.formState.errors.senha && (
              <p className="text-red-500 text-[10px] font-bold uppercase">
                {registroForm.formState.errors.senha.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A7C44] hover:bg-[#3d6638] py-6 rounded-xl"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Criar Conta Grátis"
            )}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
