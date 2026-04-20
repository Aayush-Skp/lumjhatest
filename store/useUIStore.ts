"use client";

import { create } from "zustand";

export type ThemeName = "dark" | "midnight" | "aurora";

type UIStore = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;

  navOpen: boolean;
  toggleNav: () => void;
  closeNav: () => void;

  activeSection: string;
  setActiveSection: (id: string) => void;

  demoOpen: boolean;
  openDemo: () => void;
  closeDemo: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  theme: "dark",
  setTheme: (theme) => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
    set({ theme });
  },

  navOpen: false,
  toggleNav: () => set((s) => ({ navOpen: !s.navOpen })),
  closeNav: () => set({ navOpen: false }),

  activeSection: "hero",
  setActiveSection: (id) => set({ activeSection: id }),

  demoOpen: false,
  openDemo: () => set({ demoOpen: true }),
  closeDemo: () => set({ demoOpen: false }),
}));
