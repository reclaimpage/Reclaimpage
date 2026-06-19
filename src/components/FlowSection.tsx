
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Monitor, 
  Shield, 
  Rocket, 
  Check, 
  ArrowRight,
  Globe,
  Cpu,
  CheckCircle2,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { 
    id: 1, 
    title: "Initialize Login", 
    desc: "Connect identities, wallets, and credentials securely to our decentralized auth layer.",
    icon: Monitor,
    points: ["Secure Auth Layer", "Wallet Link", "Cloud Decentralize"]
  },
  { 
    id: 2, 
    title: "Identity Assertion", 
    desc: "Define execution logic, slippage tolerances, and automation rules via our intuitive studio.",
    icon: Shield,
    points: ["Secure Logic", "Zero Knowledge", "Asset Assertion"]
  },
  { 
    id: 3, 
    title: "Execute with Precision", 
    desc: "Execute scalable decentralized workflows with institutional oversight and real-time logs.",
    icon: Rocket,
    points: ["Auto Routing", "Liquid Flowing", "Transaction Logs"]
  }
];

const guaranteePoints = [
  { icon: Globe, label: "Emerald Networking" },
  { icon: Cpu, label: "No-code Connect" },
  { icon: CheckCircle2, label: "Verified Architecture" }
];

export function FlowSection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="flow" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-primary">Reclaimpage</span> Flow
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Three simple steps to activate our decentralized banking network and master your Web3 operations.
          </p>
        </div>

        <div className="relative mb-24">
          {/* Progress Line */}
          <div className="hidden lg:block absolute top-[40px] left-[15%] right-[15%] h-px bg-white/10">
            <div 
              className="h-full bg-primary transition-all duration-700 shadow-neon"
              style={{ width: `${(activeStep - 1) * 50}%` }}
            ></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 relative">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className="group relative"
                onMouseEnter={() => setActiveStep(step.id)}
              >
                {/* Step Number Badge */}
                <div className="flex justify-center mb-8 relative z-20">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-headline font-bold text-sm transition-all duration-500",
                    activeStep >= step.id 
                      ? "bg-primary text-black shadow-neon" 
                      : "bg-[#131A26] text-white border border-white/10"
                  )}>
                    {step.id}
                  </div>
                </div>

                {/* Card Content */}
                <div className={cn(
                  "glass p-8 rounded-[2rem] border transition-all duration-500 flex flex-col h-full bg-[#0F1520]",
                  activeStep === step.id ? "border-primary/50 ring-1 ring-primary/20 scale-[1.02]" : "border-white/5 opacity-80"
                )}>
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className={cn(
                      "w-8 h-8 transition-colors duration-300",
                      activeStep === step.id ? "text-primary" : "text-slate-400"
                    )} />
                  </div>
                  
                  <h3 className="font-headline text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                    {step.desc}
                  </p>

                  <ul className="space-y-3 mb-10">
                    {step.points.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check size={10} className="text-primary" />
                        </div>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Button className={cn(
                    "w-full h-12 rounded-xl font-bold gap-2 group/btn transition-all",
                    activeStep === step.id 
                      ? "bg-primary text-black hover:bg-primary/90 shadow-neon" 
                      : "bg-white/5 text-slate-400 border border-white/5"
                  )}>
                    Launch <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="max-w-4xl mx-auto">
          <div className="glass p-10 rounded-[2.5rem] border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-5"></div>
             
             <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4 text-primary font-headline font-bold tracking-widest text-xs uppercase">
                  <Lock size={14} /> The Reclaimpage Guarantee
                </div>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-10 leading-relaxed">
                  We ensure maximum transparency and technical excellence, validated by independent audits. Our technology stack is designed for robustness, security, and performance.
                </p>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                  {guaranteePoints.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                      <p.icon size={14} />
                      {p.label}
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
