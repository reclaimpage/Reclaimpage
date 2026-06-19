
"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const specs = [
  "AES-256 encrypted communication channels",
  "Zero-trust multi-signature verification model",
  "Distributed validation network infrastructure",
  "Multi-region failover and redundancy protocols",
  "Tee-isolated execution environments",
  "Formal verification of smart contract logic"
];

export function Architecture() {
  return (
    <section id="architecture" className="py-24 lg:py-32 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT: SPECS */}
          <div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Impregnable Architecture
            </h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Engineered for enterprise-grade security, operational resilience, and seamless interoperability across decentralized infrastructure layers.
            </p>

            <div className="grid sm:grid-cols-1 gap-6">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <CheckCircle2 size={16} className="text-primary group-hover:text-black" />
                  </div>
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: VIZ */}
          <div className="glass rounded-[3rem] p-4 bg-gradient-to-br from-white/5 to-transparent border-white/5 shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 grid-pattern opacity-20"></div>
            <div className="relative aspect-square md:aspect-video lg:aspect-square flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center relative animate-pulse">
                 <div className="absolute inset-0 rounded-full border border-primary/20 animate-[ping_3s_linear_infinite]"></div>
                 <div className="absolute inset-0 rounded-full border border-primary/10 scale-150 animate-[ping_4s_linear_infinite]"></div>
                 <span className="text-6xl font-headline font-black text-primary">◈</span>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                 {/* Decorative elements representing nodes */}
                 <div className="absolute top-10 left-1/4 w-3 h-3 rounded-full bg-primary shadow-neon"></div>
                 <div className="absolute bottom-20 right-10 w-2 h-2 rounded-full bg-accent opacity-50"></div>
                 <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-primary/40"></div>
                 <div className="absolute bottom-1/4 left-10 w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div className="absolute bottom-8 text-center w-full px-8">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Encrypted Distributed Mesh v2.4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
