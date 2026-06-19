
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, ShieldCheck } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", val: 1200 },
  { month: "Feb", val: 2100 },
  { month: "Mar", val: 1800 },
  { month: "Apr", val: 2400 },
  { month: "May", val: 3200 },
  { month: "Jun", val: 2800 },
  { month: "Jul", val: 3900 },
];

export function Hero() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT CONTENT */}
          <div>
            <Badge variant="outline" className="glass text-primary px-4 py-2 rounded-full mb-8 border-primary/20 flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Infrastructure Layer • Web3 Operating System
            </Badge>

            <h1 className="font-headline text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-8">
              Master Your{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                Web3 Journey
              </span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed max-w-xl mb-10">
              Navigate decentralized ecosystems through enterprise-grade automation, secure wallet orchestration, intelligent routing, and high-performance digital asset infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-400 text-black font-bold h-14 px-8 rounded-xl shadow-neon">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="glass h-14 px-8 rounded-xl border-white/10 hover:border-primary/50 text-white">
                Explore Ecosystem
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-xl">
              <div className="space-y-1">
                <div className="font-headline text-3xl font-bold">$8B+</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-medium">Secured Volume</div>
              </div>
              <div className="space-y-1">
                <div className="font-headline text-3xl font-bold">100K+</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-medium">Active Users</div>
              </div>
              <div className="space-y-1">
                <div className="font-headline text-3xl font-bold">99.9%</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-medium">Uptime Status</div>
              </div>
            </div>
          </div>

          {/* RIGHT DASHBOARD */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="glass glow-border rounded-3xl p-8 shadow-2xl relative">
              <div className="flex justify-between items-center mb-10">
                <div className="space-y-1">
                  <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Portfolio Performance</span>
                  <div className="text-2xl font-headline font-bold">$4,281,092.44</div>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-300 border-none px-3 py-1 animate-pulse">LIVE</Badge>
              </div>

              <div className="h-[280px] w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" hide />
                    <YAxis hide />
                    <Area type="monotone" dataKey="val" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-4 bg-white/5 border-white/5">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Total TVL</p>
                  <p className="font-headline text-xl font-bold">$2.8B</p>
                  <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1 font-medium"><TrendingUp size={12}/> +12.4%</p>
                </div>
                <div className="glass rounded-2xl p-4 bg-white/5 border-white/5">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Avg Yield</p>
                  <p className="font-headline text-xl font-bold">32.8%</p>
                  <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1 font-medium"><TrendingUp size={12}/> +4.1%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
