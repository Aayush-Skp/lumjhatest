"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/useUIStore";

const IDS = ["features", "how", "security", "analytics"];

export function ScrollSpy() {
  const setActiveSection = useUIStore((s) => s.setActiveSection);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [setActiveSection]);

  return null;
}
