import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BrandLogo from "@/components/layout/BrandLogo";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  async function handleLogin(formData: FormData) {
    "use server";
    
    const password = formData.get("password") as string;
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (correctPassword && password === correctPassword) {
      (await cookies()).set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      redirect("/admin");
    } else {
      // In a real app we might return an error state, but for simplicity we redirect back to login with an error param
      redirect("/admin/login?error=1");
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(78,91,135,0.25),_transparent_35%),linear-gradient(180deg,_#060606_0%,_#0b0b0d_100%)] px-4 text-white">
      <form action={handleLogin} className="w-full max-w-sm rounded-[24px] border border-white/10 bg-black/30 p-8 shadow-2xl backdrop-blur-xl text-center">
        <BrandLogo compact className="mx-auto mb-6 flex justify-center" />
        <h1 className="mb-2 text-2xl font-semibold">Admin Access</h1>
        <p className="mb-6 text-sm text-gray-400">Enter password to manage portfolio content.</p>
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-4 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-black/60"
        />
        
        {searchParams?.error && (
          <p className="mb-4 text-sm text-red-400">Incorrect password.</p>
        )}
        
        <button type="submit" className="w-full rounded-full bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90">
          Login
        </button>
      </form>
    </div>
  );
}
