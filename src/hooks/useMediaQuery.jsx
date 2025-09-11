import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const get = () => window.matchMedia(query).matches;
  const [matches, setMatches] = useState(get);

  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    // compat com browsers antigos
    m.addEventListener?.("change", onChange) ?? m.addListener(onChange);
    return () =>
      m.removeEventListener?.("change", onChange) ?? m.removeListener(onChange);
  }, [query]);

  return matches;
}
