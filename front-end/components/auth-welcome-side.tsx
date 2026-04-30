import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../components/icons/Logo.png";

interface AuthWelcomeSideProps {
  linkText: string;
  linkHref: string;
  linkActionText: string;
}

export default function AuthWelcomeSide({ 
  linkText, 
  linkHref, 
  linkActionText 
}: AuthWelcomeSideProps) {
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 text-center space-y-6">
      <Image 
        src={logo} 
        alt="Sabor e Magia Logo" 
        width={200} 
        height={200} 
        priority 
      />
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-700">Seja Bem-Vindo(a)!</h2>
        <p className="text-xl text-gray-600 max-w-xs">
          Seu próximo pedido favorito começa aqui.
        </p>
      </div>
      <p className="mt-8 text-lg">
        {linkText}{" "}
        <Link href={linkHref} className="font-bold underline text-[#4A7C44]">
          {linkActionText}
        </Link>
      </p>
    </div>
  );
}