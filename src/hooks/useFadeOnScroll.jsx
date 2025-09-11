// src/hooks/useFadeDirection.js
import { useEffect, useRef, useState } from "react";

export default function useFadeDirection(threshold = 0.5) {
  const ref = useRef(null);
  const [state, setState] = useState("out");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting ? "in" : "out");
      },
      {
        threshold,
        rootMargin: "-10% 0px -10% 0px" // entra e sai com 10% de folga
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, state];
}
