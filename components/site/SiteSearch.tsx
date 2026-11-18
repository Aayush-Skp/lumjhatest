"use client";

import { useEffect, useRef } from "react";

/**
 * Inline Lumjha search box (navbar). The widget script (loaded in the root
 * layout, `#lumjha-search-widget`) finds `[data-lumjha-search]` nodes and pins
 * a fixed-position iframe over each one, appended to <body> and never removed.
 *
 * Every page renders its own <Navbar>, so a plain <div> would be a new mount
 * point on each client navigation and leave an orphaned iframe behind. Instead
 * one mount node lives for the whole visit and is moved into whichever navbar
 * is on screen; the widget sees it is already mounted and just repositions.
 */
let mountNode: HTMLDivElement | null = null;

// the widget repositions its iframe on resize (rAF-debounced); a detached
// mount node measures 0×0, so this also hides it between pages
const reposition = () => window.dispatchEvent(new Event("resize"));

export default function SiteSearch({ className = "" }: { className?: string }) {
  const slot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountNode) {
      mountNode = document.createElement("div");
      mountNode.setAttribute("data-lumjha-search", "");
      mountNode.setAttribute("data-position", "inline");
    }
    const node = mountNode;
    slot.current?.appendChild(node);
    reposition();
    return () => {
      node.remove();
      reposition();
    };
  }, []);

  return <div ref={slot} className={className} />;
}
