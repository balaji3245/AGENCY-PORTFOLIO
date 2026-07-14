"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(password: string) {
  const correctPassword = process.env.ADMIN_PASSWORD || "admin123";
  
  if (password === correctPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }
  
  return { success: false, error: "Incorrect password" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
