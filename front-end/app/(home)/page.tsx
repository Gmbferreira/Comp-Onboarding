"use client";

import React, { useState, useEffect } from "react"; // 1. Adicionamos o useEffect e useState
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
import { Prato } from "../schemas/cardapioSchemas";
import { mockPratos } from "../mocks/cardapioMock";

export default function HomePage() {
  const [destaques, setDestaques] = useState<Prato[]>([]);

  useEffect(() => {
    const pratosSorteados = [...mockPratos]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setDestaques(pratosSorteados);
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F5F5ED] flex flex-col items-center pt-8 md:pt-16 px-4">
        <div className="w-full max-w-5xl px-2 lg:px-0">
          <Carousel
            className="w-full overflow-hidden rounded-[2rem] shadow-2xl border-8 border-white"
            opts={{ loop: true }}
          >
            <CarouselContent>
              {destaques.length > 0 ? (
                destaques.map((prato) => (
                  <CarouselItem key={prato.id}>
                    <div className="relative h-[250px] sm:h-[400px] md:h-[500px] w-full">
                      <img
                        src={prato.imagem}
                        alt={prato.nome}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
                        <span className="bg-[#4A7C44] w-fit px-3 py-1 rounded-full text-xs font-bold mb-2 uppercase tracking-tighter">
                          Sugestão do Chef
                        </span>
                        <h2 className="text-2xl md:text-5xl font-bold">
                          {prato.nome}
                        </h2>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="h-[250px] sm:h-[400px] md:h-[500px] w-full bg-gray-200 animate-pulse rounded-[2rem]" />
                </CarouselItem>
              )}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex left-6 bg-white/20 hover:bg-white/40 border-none text-white scale-150" />
            <CarouselNext className="hidden md:flex right-6 bg-white/20 hover:bg-white/40 border-none text-white scale-150" />
          </Carousel>
        </div>

        <div className="mt-12 md:mt-20 text-center space-y-8">
          <p className="text-xl md:text-3xl font-medium text-gray-700 tracking-tight italic">
            "Seu próximo pedido favorito começa aqui."
          </p>

          <div className="flex justify-center">
            <Link href="/cardapio">
              <Button className="bg-[#4A7C44] hover:bg-[#3d6638] text-white text-3xl md:text-5xl px-12 py-10 md:px-16 md:py-14 rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95 border-b-[6px] border-[#2d4d29] font-bold">
                Peça Agora
              </Button>
            </Link>
          </div>

          <div className="pt-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-gray-500 font-semibold text-sm md:text-xl">
              <span>Entrega rápida</span>
              <span className="hidden md:inline text-[#4A7C44] text-3xl">
                •
              </span>
              <span>Ingredientes frescos</span>
              <span className="hidden md:inline text-[#4A7C44] text-3xl">
                •
              </span>
              <span>Pratos artesanais</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
