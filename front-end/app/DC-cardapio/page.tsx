"use client";

import React from "react";
import Navbar from "@/components/navbar";
import ListaCardapio from "./listaCardapio";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FDFDF7]">
      {/* Navbar com a configuração solicitada */}
      <Navbar showLogin={true} showLogout={false} />

      <main className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <ListaCardapio />
        </div>
      </main>
    </div>
  );
}