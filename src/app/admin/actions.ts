"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  (await cookies()).delete("admin_session");
  redirect("/admin/login");
}

export async function verifyPassword(password: string) {
  const correctPassword = process.env.ADMIN_PASSWORD;
  return !!correctPassword && password === correctPassword;
}
