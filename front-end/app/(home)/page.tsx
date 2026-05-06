import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  const role = cookieStore.get("user-role")?.value;

  if (!token) {
    redirect("/DC-landing-page");
  }

  if (role === "ADMIN") {
    redirect("/lista-produtos");
  } else {
    redirect("/landing-page");
  }

  return null;
}
