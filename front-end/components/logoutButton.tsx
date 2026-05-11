"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react"; // Ícone bonitinho de saída
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function LogoutButton({ isInHeader }: { isInHeader?: boolean }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    toast.success("Sessão encerrada com sucesso!");
    router.push("/usuario-login");
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className={cn(
        "flex gap-2 items-center font-semibold transition-colors",
        isInHeader 
          ? "text-white hover:bg-white/10 hover:text-red-400" 
          : "text-red-600 hover:text-red-700 hover:bg-red-50"
      )}
    >
      <LogOut className="h-4 w-4" />
      Sair
    </Button>
  );
}