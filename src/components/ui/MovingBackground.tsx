"use client";

import { useEffect, useState } from "react";

export default function MovingBackground() {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateReducedMotion = () => {
      setReducedMotion(mediaQuery.matches || window.innerWidth < 768);
    };

    updateReducedMotion();
    mediaQuery.addEventListener("change", updateReducedMotion);
    window.addEventListener("resize", updateReducedMotion);

    return () => {
      mediaQuery.removeEventListener("change", updateReducedMotion);
      window.removeEventListener("resize", updateReducedMotion);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#030014]">
      <div
        className={`absolute top-[8%] left-[12%] rounded-full bg-[#7C3AED]/18 blur-[96px] ${
          reducedMotion ? "h-[34vw] w-[34vw]" : "orb-float-slow h-[34vw] w-[34vw]"
        }`}
      />

      <div
        className={`absolute right-[8%] top-[36%] rounded-full bg-[#DB2777]/14 blur-[104px] ${
          reducedMotion ? "h-[38vw] w-[38vw]" : "orb-float-medium h-[38vw] w-[38vw]"
        }`}
      />

      <div
        className={`absolute bottom-[-6%] left-[28%] rounded-full bg-[#06B6D4]/12 blur-[112px] ${
          reducedMotion ? "h-[42vw] w-[42vw]" : "orb-float-fast h-[42vw] w-[42vw]"
        }`}
      />
    </div>
  );
}
