"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/supabase";

export function Footer() {
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
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
    <footer className="mt-32 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="font-headline text-3xl font-black tracking-tighter mb-6 flex items-center gap-3">
               {logoUrl ? (
                 <div className="h-8 w-auto flex items-center">
                   <img src={logoUrl} alt="Logo" className="h-full object-contain" />
                 </div>
               ) : (
                 <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-black text-lg">R</div>
               )}
               Reclaimpage
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Enterprise-grade decentralized infrastructure designed for secure, scalable, and intelligent Web3 operations. Empowering the next generation of digital finance.
            </p>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white mb-6 uppercase tracking-[0.2em] text-[10px]">Products</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Exchange Suite</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Smart Wallet</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">AI Router</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Web3 API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white mb-6 uppercase tracking-[0.2em] text-[10px]">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Security Audits</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Ecosystem Stats</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Developer Guides</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white mb-6 uppercase tracking-[0.2em] text-[10px]">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Press Kit</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 items-center">
          <span className="text-slate-500 text-xs font-medium">
            © 2025 Reclaimpage Infrastructure Group. All rights reserved.
          </span>
          <div className="flex gap-8 text-xs font-medium text-slate-500">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Security Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
