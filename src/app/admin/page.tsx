import type { Metadata } from "next";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
  title: "Admin | YJ DEVELOPERS",
  description: "Control panel for updating YJ DEVELOPERS portfolio content.",
};

export default function AdminPage() {
  return <AdminPanel />;
}
