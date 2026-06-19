
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Initialize Profile", desc: "Connect identities, wallets, and credentials securely to our decentralized auth layer." },
  { id: 2, title: "Configure Routing", desc: "Define execution logic, slippage tolerances, and automation rules via our intuitive studio." },
  { id: 3, title: "Deploy Automations", desc: "Execute scalable decentralized workflows with institutional oversight and real-time logs." }
];

export function FlowSection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="flow" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">The Chainnova Flow</h2>
          <p className="text-slate-400">Streamlined onboarding for complex operations.</p>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-0.5 bg-white/5">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-green-300 transition-all duration-700"
              style={{ width: `${(activeStep - 1) * 50}%` }}
            ></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 relative">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className="group cursor-pointer"
                onMouseEnter={() => setActiveStep(step.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center font-headline font-bold text-2xl mb-8 transition-all duration-500 z-10",
                    activeStep >= step.id 
                      ? "bg-primary text-black shadow-neon" 
                      : "bg-white/5 text-white border border-white/10 group-hover:border-primary/50"
                  )}>
                    {step.id}
                  </div>
                  <div className={cn(
                    "glass p-10 rounded-[2.5rem] border transition-all duration-500 w-full",
                    activeStep === step.id ? "border-primary/50 bg-white/5 scale-[1.02]" : "border-white/5"
                  )}>
                    <h3 className="font-headline text-2xl font-bold mb-4 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
