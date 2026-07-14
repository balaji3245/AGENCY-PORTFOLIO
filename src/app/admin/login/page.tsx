"use client";

import { useState } from "react";
import { login } from "../actions";
import { motion } from "framer-motion";
import { Lock, AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await login(password);
      if (result.success) {
        window.location.href = "/admin";
      } else {
        setError(result.error || "Login failed");
        setIsLoading(false);
      }
    } catch {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030612] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7c66ff]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-[#0a0c12]/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] relative z-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7c66ff] to-fuchsia-600 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(124,102,255,0.3)]">
            <Lock className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Admin Access</h2>
          <p className="text-gray-400 text-sm font-light">
            Enter password to manage YJ DEVELOPERS website
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 pl-12 text-white placeholder-gray-600 focus:outline-none focus:border-[#7c66ff]/60 focus:bg-[#7c66ff]/5 transition-all text-sm"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-xs"
            >
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7c66ff] hover:bg-[#6c54ff] active:scale-[0.98] text-white font-semibold py-4 px-6 rounded-2xl shadow-[0_15px_30px_rgba(124,102,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:pointer-events-none group"
          >
            {isLoading ? "Verifying..." : "Access Dashboard"}
            {!isLoading && (
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
