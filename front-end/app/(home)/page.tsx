import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("auth-token")?.value;
  const role = cookieStore.get("user-role")?.value;

  // Se não tem ID salvo, não está logado
  if (!userId) {
    redirect("/usuario-login");
  }

  // Se está logado, vai para a página certa
  if (role === "ADMIN") {
    redirect("/lista-produtos");
  } else {
    redirect("/landing-page");
  }

  return null;
}