import React from "react";
import Navbar from "@/components/navbar";
import FormLogin from "./form";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F5F5ED] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#4A7C44]">Sabor & Magia</h1>
            <p className="text-gray-500 mt-2">
              Sua jornada gastronômica começa aqui
            </p>
          </div>

          <FormLogin />

          <p className="text-center text-xs text-gray-400 mt-8">
            Ao continuar, você concorda com nossos Termos de Uso.
          </p>
        </div>
      </main>
    </>
  );
}
