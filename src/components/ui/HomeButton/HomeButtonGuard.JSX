// src/components/ui/HomeButton/HomeButtonGuard.jsx
"use client";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import HomeButton from "./HomeButton";

function GuardInner() {
  const pathname = usePathname();
  if (pathname === "/") return null;          
  return (
    <HomeButton
      floating
      position="top-left"                      
      size="md"
      style={{ "--hb-left": "20px", "--hb-top": "20px" }}
    />
  );
}
export default function HomeButtonGuard() {
  return <Suspense fallback={null}><GuardInner /></Suspense>;
}
