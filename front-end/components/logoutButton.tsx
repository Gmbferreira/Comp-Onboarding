"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react"; // Ícone bonitinho de saída
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("usuario");

    toast.success("Sessão encerrada com sucesso!");

    router.push("/");
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="text-red-600 hover:text-red-700 hover:bg-red-50 flex gap-2 items-center font-semibold"
    >
      <LogOut className="h-4 w-4" />
      Sair
    </Button>
  );
}
