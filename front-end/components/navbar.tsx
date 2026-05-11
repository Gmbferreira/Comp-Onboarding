// Navbar.tsx
"use client";

import { cn } from "@/lib/utils";
import { MenuIcon, UtensilsCrossed, ClipboardList, Heart, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import logo from "../components/icons/Logo.png";
import LogoutButton from "./logoutButton";

export type NavbarLink = { href: string; title: string };

const getIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case "cardápio": return <UtensilsCrossed className="h-4 w-4" />;
    case "meus pedidos": return <ClipboardList className="h-4 w-4" />;
    case "favoritos": return <Heart className="h-4 w-4" />;
    default: return null;
  }
};

export default function Navbar({
  links,
  className,
  showLogin = false,  // Controla o botão "Entrar"
  showLogout = false, // Controla o botão "Sair"
}: {
  links?: NavbarLink[];
  className?: string;
  showLogin?: boolean;
  showLogout?: boolean;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 w-full shadow-sm", className)}>
      <div className="w-full bg-[#062415] text-white py-1 px-4 border-b border-white/5">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between h-12">
          
          <Link href="/landing-page" className="flex items-center">
            <Image
              src={logo}
              alt="Logo Sabor e Magia"
              width={110} 
              height={35}
              className="cursor-pointer brightness-0 invert object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            {links && links.length > 0 && (
              <ul className="flex items-center gap-1">
                {links.map((link, i) => (
                  <li key={`NavbarLink-${i}`}>
                    <Button
                      variant="ghost"
                      asChild
                      className="text-white hover:bg-white/10 hover:text-white flex gap-2 items-center rounded-full px-3 h-8" 
                    >
                      <Link href={link.href}>
                        {getIcon(link.title)}
                        <span className="font-medium text-xs uppercase tracking-wide">{link.title}</span>
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            {/* Divisor e botões condicionais */}
            {isMounted && (showLogin || showLogout) && (
              <div className="flex items-center gap-2 ml-2 border-l border-white/20 pl-4 h-6">
                {showLogin && (
                  <Button variant="ghost" asChild className="text-white hover:bg-white/10 h-8 px-3 gap-2">
                    <Link href="/usuario-login">
                      <User className="h-4 w-4" />
                      <span className="text-xs font-semibold">Entrar</span>
                    </Link>
                  </Button>
                )}
                
                {showLogin && showLogout && <div className="h-4 w-[1px] bg-white/20" />} 

                {showLogout && <LogoutButton isInHeader />}
              </div>
            )}
          </nav>

          <nav className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#062415] text-white border-white/10">
                <div className="flex flex-col gap-4 mt-8">
                   {/* Links do menu mobile aqui... */}
                   {showLogin && (
                     <Link href="/usuario-login" className="flex items-center gap-2 p-2">
                       <User className="h-5 w-5" /> Entrar
                     </Link>
                   )}
                   {showLogout && <LogoutButton />}
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
}