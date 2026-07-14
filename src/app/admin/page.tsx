import AdminPanel from "@/components/admin/AdminPanel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin | YJ DEVELOPERS",
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_session");

  if (!authCookie || authCookie.value !== "authenticated") {
    redirect("/admin/login");
  }

  return <AdminPanel />;
}
