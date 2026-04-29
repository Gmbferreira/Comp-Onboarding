import React from "react";
import Navbar from "@/components/navbar";
import TabelaProdutos from "./tabelaProdutos";

export default function Page() {
  return (
    <>
      <Navbar
        links={[{ href: "/lista-produtos", title: "Lista de produtos" }]}
      />
      <main className="min-h-screen bg-[#F5F5ED] p-4 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <TabelaProdutos />
        </div>
      </main>
    </>
  );
}
