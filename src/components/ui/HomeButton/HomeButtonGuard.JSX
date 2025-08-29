"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import HomeButton from "./HomeButton";

function GuardInner() {
  const pathname = usePathname();
  if (pathname === "/") return null;            // hide on home
  return <HomeButton floating position="top-left" />;
}

export default function HomeButtonGuard() {
  // Suspense avoids the “missing suspense with CSR bailout” warning
  return (
    <Suspense fallback={null}>
      <GuardInner />
    </Suspense>
  );
}