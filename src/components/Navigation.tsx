"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WalletModal } from "@/components/WalletModal";
import { supabaseClient } from "@/lib/supabase";

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    setMounted(true);
    const fetchLogo = async () => {
      const { data } = await supabaseClient
        .from("app_settings")
        .select("value")
        .eq("key", "logo_url")
        .single();
      if (data) setLogoUrl(data.value);
    };
    fetchLogo();
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 bg-[#070B12]/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <div className="h-10 w-auto flex items-center">
                <img src={logoUrl} alt="Logo" className="h-full object-contain" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center font-bold text-[#070B12] font-headline shadow-neon">
                R
              </div>
            )}
            <span className="font-headline text-xl font-bold tracking-tight text-white">
              Reclaimpage
            </span>
          </div>

          <div className="flex items-center gap-4">
            {mounted && (
              <WalletModal>
                <Button className="bg-gradient-to-r from-[#10B981] to-[#34D399] text-[#070B12] font-bold rounded-xl hover:scale-[1.02] transition-all shadow-neon">
                  Connect Wallet
                </Button>
              </WalletModal>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
