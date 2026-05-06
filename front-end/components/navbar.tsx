"use client";

import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import logo from "../components/icons/Logo.png";
import LogoutButton from "./logoutButton";

export type NavbarLink = { href: string; title: string };

export default function Navbar({
  links,
  className,
}: {
  links?: NavbarLink[];
  className?: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-border/40 bg-background/95 text-xl backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="mx-auto w-full bg-card/60 pt-0 border-b rounded-b-lg shadow-lg">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4">
          <Link href="/landing-page">
            <Image
              src={logo}
              alt="Logo Sabor e Magia"
              width={100}
              height={100}
              className="cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {links && links.length > 0 && (
              <ul className="flex items-center gap-2">
                {links.map((link, i) => (
                  <li key={`NavbarLink-${i}`}>
                    <Button
                      className="h-full max-w-32 text-wrap text-center"
                      asChild
                      variant={"ghost"}
                    >
                      <Link href={link.href}>{link.title}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            {isMounted && links && <LogoutButton />}
          </nav>

          {/* Mobile Navigation */}

          {isMounted && links && links.length > 0 && (
            <nav className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size={"icon"}>
                    <MenuIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col h-full py-6">
                    <ul className="grid items-center gap-4 flex-grow">
                      {links.map((link, i) => (
                        <li key={`NavbarLink-mobile-${i}`}>
                          <Button
                            className="h-full w-full text-center text-xl"
                            asChild
                            variant={"ghost"}
                          >
                            <Link href={link.href}>{link.title}</Link>
                          </Button>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t pt-4">
                      <LogoutButton />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
