import React, { lazy, Suspense } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

const HomeDesktop = lazy(() => import("./HomeDesktop"));
const HomeMobile  = lazy(() => import("./mobileHomeMobile"));

export default function HomeResponsive() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Suspense fallback={<div style={{padding: 24}}>Carregando…</div>}>
      {isMobile ? <HomeMobile /> : <HomeDesktop />}
    </Suspense>
  );
}
