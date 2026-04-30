import AuthWelcomeSide from "@/components/auth-welcome-side";
import React from "react";
import CadastroForm from "./form";


export default function CadastroPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#F5F5ED]">
      {/* LADO ESQUERDO: INFO (Reutilizado) */}
      <AuthWelcomeSide 
        linkText="Já tem uma conta?" 
        linkHref="/usuario-login" 
        linkActionText="Clique aqui" 
      />

      {/* LADO DIREITO: FORMULÁRIO */}
      <div className="w-full md:w-1/2 bg-[#D1E7D3] md:rounded-l-[3rem] flex items-center justify-center p-8">
        <CadastroForm />
      </div>
    </main>
  );
}