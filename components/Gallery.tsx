"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/lib/types";

/** First shot full width, the rest two per row. Clicking opens a viewer with ← → navigation. */
export function Gallery({ images }: { images: ProjectImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open === null) {
      if (dialog.open) dialog.close();
    } else if (!dialog.open) {
      dialog.showModal();
    }
  }, [open]);

  const step = (delta: number) =>
    setOpen((i) => (i === null ? i : (i + delta + images.length) % images.length));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  if (images.length === 0) return null;
  const current = open === null ? null : images[open];

  return (
    <section className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {images.map((img, i) => (
          <figure key={img.src} className={i === 0 || images.length === 2 ? "sm:col-span-2" : undefined}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="block w-full overflow-hidden rounded-[10px] border transition-colors hover:border-[#333844] cursor-zoom-in"
              style={{ borderColor: "var(--border)", background: "var(--panel)" }}
              aria-label={img.caption ? `${img.caption} 크게 보기` : "크게 보기"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.caption}
                width={img.width}
                height={img.height}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="block w-full h-auto"
              />
            </button>
            {img.caption && (
              <figcaption className="text-[12.5px] mt-2 leading-snug" style={{ color: "var(--fg-faint)" }}>
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
        className="gallery-viewer"
      >
        {current && (
          <div className="flex flex-col items-center gap-3 p-3 sm:p-6" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.caption}
              width={current.width}
              height={current.height}
              className="block max-w-full h-auto rounded-lg"
              style={{ maxHeight: "calc(100dvh - 120px)", width: "auto" }}
            />
            <div className="flex items-center gap-4 text-[13px]" style={{ color: "var(--fg-dim)" }}>
              {images.length > 1 && (
                <button type="button" onClick={() => step(-1)} className="px-2 py-1 hover:text-white">
                  ←
                </button>
              )}
              <span className="text-center">
                {current.caption}
                {images.length > 1 && (
                  <span className="mono ml-2" style={{ color: "var(--fg-faint)" }}>
                    {(open ?? 0) + 1}/{images.length}
                  </span>
                )}
              </span>
              {images.length > 1 && (
                <button type="button" onClick={() => step(1)} className="px-2 py-1 hover:text-white">
                  →
                </button>
              )}
              <button type="button" onClick={() => setOpen(null)} className="px-2 py-1 hover:text-white" aria-label="닫기">
                ✕
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
