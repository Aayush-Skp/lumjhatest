"use client";

import { useState } from "react";
import type { DragEvent } from "react";

const ACCEPT = [".pdf", ".doc", ".docx", ".txt"];
const MAX_BYTES = 5 * 1024 * 1024;

/** Click-or-drop document box beside the Lumjha Play chat demo. */
export default function DocumentDrop({ className = "" }: { className?: string }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  function pick(f: File | undefined) {
    if (!f) return;
    const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
    if (!ACCEPT.includes(ext)) return setError("Please choose a PDF, DOCX or TXT file.");
    if (f.size > MAX_BYTES) return setError("That file is over 5MB.");
    setError("");
    setFile(f);
    // TODO: send the document to the demo agent so it answers from it
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    pick(e.dataTransfer.files[0]);
  }

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        // ignore leaves into the box's own children
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false);
      }}
      onDrop={onDrop}
      className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center shadow-[0_10px_30px_-12px_rgba(0,121,242,0.18)] transition hover:border-[#5675FF] hover:bg-[#F4F6FF] ${
        dragging ? "border-[#5675FF] bg-[#EEF2FF]" : "border-[#5675FF]/60 bg-white"
      } ${className}`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5675FF]/10 text-[#5675FF] transition group-hover:bg-[#5675FF]/15">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 16V4m0 0-4 4m4-4 4 4" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
      </span>
      <span className="mt-4 text-lg font-bold text-[#0B1526]">{dragging ? "Drop it here" : "Upload a document"}</span>
      <span className="mt-1.5 text-sm leading-relaxed text-slate-600">
        Drag a file here, then ask the agent questions about it.
      </span>
      <span className="mt-5 rounded-full bg-[#5675FF] px-5 py-2 text-sm font-semibold text-white">
        {file ? "Choose another file" : "Choose file"}
      </span>
      <span aria-live="polite" className="mt-3 max-w-full text-xs">
        {error ? (
          <span className="text-red-600">{error}</span>
        ) : file ? (
          <span className="block truncate font-medium text-[#0B1526]">{file.name}</span>
        ) : (
          <span className="text-slate-500">PDF, DOCX or TXT · up to 5MB</span>
        )}
      </span>
      <input
        type="file"
        name="document"
        accept={ACCEPT.join(",")}
        className="sr-only"
        onChange={(e) => {
          pick(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </label>
  );
}
