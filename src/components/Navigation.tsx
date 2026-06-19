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

          <div className="flex items-center gap-4">
            <Button className="bg-gradient-to-r from-emerald-500 to-green-400 text-black font-semibold rounded-xl hover:scale-[1.02] transition-transform">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
