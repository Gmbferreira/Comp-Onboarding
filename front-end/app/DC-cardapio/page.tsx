"use client";

import React from "react";
import Link from "next/link";
import { UserCircle2 } from "lucide-react";
import ListaCardapio from "./listaCardapio";

export default function Page() {
  return (
    <>
      <header className="bg-[#F5F5ED] border-b p-4 lg:px-12 flex items-center justify-between">
        <div className="text-2xl font-bold text-[#4A7C44]">Sabor&Magia</div>

        <Link href="/usuario-login">
          <UserCircle2 className="w-9 h-9 text-gray-600 hover:text-[#4A7C44] transition-colors" />
        </Link>
      </header>

      <div className="min-h-screen bg-[#F5F5ED] p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <ListaCardapio />
        </div>
      </div>
    </>
  );
}
