import React from "react";
import Navbar from "@/components/navbar";
import TabelaProdutos from "./tabelaProdutos";

export default function Page() {
  return (
    <>
      <Navbar
        links={[{ href: "/lista-produtos", title: "Lista de produtos" }]}
      />
      <main className="min-h-screen bg-[#E5E5E5] p-6 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <TabelaProdutos />
        </div>
      </main>
    </>
  );
}
