"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Bike, Leaf, Utensils, Sparkles, Loader2 } from "lucide-react";
import { Prato } from "../schemas/cardapioSchemas";
import { mockPratos } from "../mocks/cardapioMock";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageLogged() {
  const [destaques, setDestaques] = useState<Prato[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando o carregamento dos pratos
    const pratosSorteados = [...mockPratos]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    setDestaques(pratosSorteados);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDF7] flex flex-col font-sans">
      {/* Navbar configurada exatamente como solicitado: Cardápio + Sair */}
      <Navbar
        showLogin={false}
        showLogout={true}
        links={[{ href: "/cardapio", title: "Cardápio" }]}
      />

      <main className="flex-grow flex flex-col items-center justify-center pt-4 md:pt-8 px-4 pb-12">
        {/* Seção do Carrossel com verificação de carregamento */}
        <div className="w-full max-w-4xl min-h-[250px] md:min-h-[350px] flex items-center justify-center">
          {loading ? (
            <Skeleton className="w-[896px] h-[436px]" />
          ) : destaques.length > 0 ? (
            <Carousel
              className="w-full rounded-[2rem] shadow-lg overflow-hidden border-[8px] border-white"
              opts={{ loop: true }}
            >
              <CarouselContent>
                {destaques.map((prato) => (
                  <CarouselItem key={prato.id}>
                    <div className="relative h-[250px] md:h-[350px] lg:h-[420px] w-full">
                      <img
                        src={prato.imagem ?? ""}
                        alt={prato.nome ?? "Prato"}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10">
                        <span className="bg-[#5B8C51]/90 backdrop-blur-sm w-fit px-3 py-1 rounded-full text-[10px] font-bold mb-2 uppercase tracking-widest text-white flex items-center gap-2">
                          <Utensils className="h-3 w-3" /> Sugestão do Chef
                        </span>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                          {prato.nome}
                        </h2>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-black/20 hover:bg-black/40 border-none text-white" />
              <CarouselNext className="right-4 bg-black/20 hover:bg-black/40 border-none text-white" />
            </Carousel>
          ) : (
            <div className="text-gray-400">
              Nenhum destaque disponível no momento.
            </div>
          )}
        </div>

        {/* Seção de Chamada (CTA) */}
        <div className="mt-8 text-center w-full max-w-4xl space-y-6">
          <div className="flex items-center justify-center gap-2 text-[#4A7C44]">
            <p className="text-base md:text-xl font-serif italic text-gray-700 tracking-tight">
              “Seu próximo pedido favorito começa aqui.”
            </p>
          </div>

          <div className="flex justify-center">
            {/* Redireciona para o cardapio logado */}
            <Link href="/cardapio">
              <Button className="bg-[#4A7C44] hover:bg-[#3d6638] text-white text-lg md:text-xl px-8 py-6 md:px-10 md:py-7 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 flex gap-2 items-center font-semibold">
                <Leaf className="h-5 w-5" />
                Peça Agora
              </Button>
            </Link>
          </div>

          {/* Barra de Diferenciais */}
          <div className="pt-6 w-full">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-around gap-6 border border-gray-100 shadow-sm">
              <FeatureItem
                icon={<Bike className="h-5 w-5" />}
                title="Entrega rápida"
                desc="Em poucos minutos"
              />
              <div className="hidden md:block h-8 w-[1px] bg-gray-200" />
              <FeatureItem
                icon={<Leaf className="h-5 w-5" />}
                title="Ingredientes frescos"
                desc="Selecionados com carinho"
              />
              <div className="hidden md:block h-8 w-[1px] bg-gray-200" />
              <FeatureItem
                icon={<Utensils className="h-5 w-5" />}
                title="Pratos artesanais"
                desc="Com amor e sabor"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3 text-left">
      <div className="bg-[#F0F4EF] p-2 md:p-3 rounded-full text-[#4A7C44] shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-gray-800 text-xs md:text-sm leading-none">
          {title}
        </h4>
        <p className="text-[10px] text-gray-500 mt-1">{desc}</p>
      </div>
    </div>
  );
}
