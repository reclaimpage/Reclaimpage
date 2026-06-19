
"use client";

const phases = [
  { phase: "PHASE 01", title: "Protocol Launch", desc: "Foundation infrastructure deployment and onboarding systems for early enterprise adopters." },
  { phase: "PHASE 02", title: "Automation Suite", desc: "Workflow orchestration engine and advanced event execution layer integration." },
  { phase: "PHASE 03", title: "Cross-Chain Engine", desc: "Deep interoperability layer and advanced AI-powered liquidity routing release." },
  { phase: "PHASE 04", title: "Omnichain Mastery", desc: "Unified ecosystem execution across all major L1 and L2 networks globally." },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Tomorrow's Roadmap</h2>
          <p className="text-slate-400 mt-4">The evolution of autonomous infrastructure.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((item, i) => (
            <div key={i} className="glass p-10 rounded-[2rem] relative border-t-4 border-emerald-500 overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-8xl font-headline font-black leading-none">{i+1}</span>
              </div>
              <span className="text-primary font-headline text-xs font-bold tracking-[0.2em] mb-4 block uppercase">{item.phase}</span>
              <h3 className="font-headline text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
