"use client";

import { useEffect, useState } from "react";

export function Typewriter({
  phrases,
  className = "",
}: {
  phrases: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(media.matches);
  }, []);

  useEffect(() => {
    if (reduce) {
      setText(phrases[0] ?? "");
      return;
    }
    const current = phrases[index % phrases.length];
    let delay = 60;
    if (!deleting && text === current) delay = 2000;
    if (deleting && text === "") delay = 300;

    const timer = window.setTimeout(() => {
      if (!deleting) {
        if (text === current) {
          setDeleting(true);
        } else {
          setText(current.slice(0, text.length + 1));
        }
      } else if (text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setText(current.slice(0, text.length - 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, reduce, phrases]);

  return (
    <span className={className}>
      {reduce ? (phrases[0] ?? "") : text}
      {!reduce && (
        <span
          className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.15em] animate-pulse rounded-sm bg-current opacity-80"
          aria-hidden
        />
      )}
    </span>
  );
}
