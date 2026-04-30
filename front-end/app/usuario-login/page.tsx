import React from "react";

import LoginForm from "./form";
import AuthWelcomeSide from "@/components/auth-welcome-side";


export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#F5F5ED]">
      {/* LADO ESQUERDO: INFO */}
      <AuthWelcomeSide 
        linkText="Não tem uma conta?" 
        linkHref="/usuario-cadastro" 
        linkActionText="Clique aqui" 
      />

      {/* LADO DIREITO: FORMULÁRIO */}
      <div className="w-full md:w-1/2 bg-[#D1E7D3] md:rounded-l-[3rem] flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </main>
  );
}