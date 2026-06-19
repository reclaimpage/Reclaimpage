"use client";

import { Shield, Zap, RefreshCw, UserCheck, Settings, FileCheck, LifeBuoy, Box, BarChart3 } from "lucide-react";

const features = [
  { icon: Shield, title: "Bank-Grade Security", desc: "Multi-layered protection architecture with continuous threat monitoring and hardware-grade isolation." },
  { icon: Zap, title: "Smart Routing", desc: "AI-driven optimization automatically finds the deepest liquidity venues for every single transaction." },
  { icon: RefreshCw, title: "Fast Settlement", desc: "Ultra-efficient execution pipelines designed to reduce latency and eliminate front-running risks." },
  { icon: UserCheck, title: "Wallet Verification", desc: "Advanced KYC/AML-compliant verification and ownership validation systems for enterprise scale." },
  { icon: Settings, title: "Automation Engine", desc: "Trigger autonomous workflows powered by event-driven logic and custom-defined conditional states." },
  { icon: FileCheck, title: "Compliance Layer", desc: "Maintain full operational transparency through automated policy controls and real-time auditing." },
  { icon: LifeBuoy, title: "Asset Recovery", desc: "Industry-first secure recovery and fallback infrastructure for mission-critical digital assets." },
  { icon: Box, title: "NFT Infrastructure", desc: "Scalable tooling and specialized APIs for institutional tokenized ownership and collectibles." },
  { icon: BarChart3, title: "Data Intelligence", desc: "Actionable insights powered by deep blockchain analytics and predictive market indicators." },
];

export function AdvantageGrid() {
  return (
    <section id="advantage" className="py-24 lg:py-32 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
            The Reclaimpage Advantage
          </h2>
          <p className="text-slate-400 text-lg">
            Comprehensive tooling designed for scalable Web3 operations, automation, security, compliance, and asset intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="glass group p-8 rounded-[2rem] hover:bg-white/5 transition-all duration-300 border-white/5 hover:border-primary/20">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-primary w-7 h-7" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
