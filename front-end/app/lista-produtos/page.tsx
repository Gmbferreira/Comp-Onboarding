"use client";

import React from "react";
import Navbar from "@/components/navbar";
import TabelaProdutos from "./tabelaProdutos";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FDFDF7]">
      {/* Navbar configurada apenas com o botão de sair */}
      <Navbar showLogin={false} showLogout={true} />
      
      <main className="p-6 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <TabelaProdutos />
        </div>
      </main>
    </div>
  );
}