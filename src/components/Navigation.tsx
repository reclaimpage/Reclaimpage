"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 bg-[#0B0F17]/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center font-bold text-black font-headline">
              R
            </div>
            <span className="font-headline text-xl font-bold tracking-tight">
              Reclaimpage
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
            <Link href="#advantage" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#flow" className="hover:text-primary transition-colors">Flow</Link>
            <Link href="#roadmap" className="hover:text-primary transition-colors">Roadmap</Link>
            <Link href="#architecture" className="hover:text-primary transition-colors">Architecture</Link>
            <Link href="#routing" className="hover:text-primary transition-colors font-semibold text-primary">Routing Tool</Link>
          </nav>

          <Button className="bg-gradient-to-r from-emerald-500 to-green-400 text-black font-semibold rounded-xl hover:scale-[1.02] transition-transform">
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}
