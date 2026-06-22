"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
};

export function Reveal({ children, className = "", delay = 0, threshold = 0.12 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          window.setTimeout(() => setShown(true), delay);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`reveal ${shown ? "visible" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}
