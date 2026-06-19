
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AdvantageGrid } from "@/components/AdvantageGrid";
import { FlowSection } from "@/components/FlowSection";
import { Roadmap } from "@/components/Roadmap";
import { Architecture } from "@/components/Architecture";
import { RoutingTool } from "@/components/RoutingTool";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-obsidian text-white selection:bg-primary/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] rounded-full bg-emerald-500/5 hero-orb -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 top-40 w-[30rem] h-[30rem] rounded-full bg-green-400/5 hero-orb translate-x-1/4"></div>
        <div className="absolute bottom-0 left-1/2 w-[50rem] h-[50rem] rounded-full bg-emerald-500/5 hero-orb -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <AdvantageGrid />
          <FlowSection />
          <RoutingTool />
          <Roadmap />
          <Architecture />
        </main>
        <Footer />
      </div>
    </div>
  );
}
