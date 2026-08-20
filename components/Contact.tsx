"use client";

import { useEffect, useState } from "react";

/**
 * Renders a contact link without ever putting the plain address in the
 * exported HTML.
 *
 * The static build ships a human-readable but pattern-proof placeholder
 * ("lsc58461 [at] gmail [dot] com"). After hydration it is swapped for the
 * real clickable link. Regex scrapers, which never run JS, only ever see the
 * placeholder; visitors see a normal link with no extra click.
 *
 * Values are stored reversed + base64 so the raw string is not greppable in
 * the bundle either. This stops cheap bulk harvesters, not a determined
 * scraper driving a real browser.
 */
function decode(encoded: string): string {
  return atob(encoded).split("").reverse().join("");
}

type Props = {
  kind: "email" | "tel";
  encoded: string;
  /** Shown before hydration and to anyone without JS. */
  placeholder: string;
  className?: string;
  style?: React.CSSProperties;
};

export function Contact({ kind, encoded, placeholder, className, style }: Props) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(decode(encoded));
  }, [encoded]);

  if (!value) {
    // static output: readable by people, not matched by email/phone regexes
    return (
      <span className={className} style={style}>
        {placeholder}
      </span>
    );
  }

  const href = kind === "email" ? `mailto:${value}` : `tel:${value.replace(/-/g, "")}`;

  return (
    <a href={href} className={className} style={style}>
      {value}
    </a>
  );
}
