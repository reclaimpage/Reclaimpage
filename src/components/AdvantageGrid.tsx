"use client";

import { 
  Shield, 
  Zap, 
  Coins, 
  Droplet, 
  ArrowRightLeft, 
  LifeBuoy, 
  Bell, 
  Lock, 
  MessageSquare, 
  Percent, 
  BarChart2, 
  UserPlus, 
  Key, 
  Layers, 
  Link as LinkIcon, 
  Fingerprint, 
  Activity, 
  Users, 
  PieChart, 
  Share2 
} from "lucide-react";

const features = [
  { icon: Shield, title: "Bank Grade Security", desc: "Multi-layered protection architecture with continuous threat monitoring and hardware-grade isolation." },
  { icon: Zap, title: "Scalability", desc: "Built to handle high transaction volumes with zero downtime and ultra-low latency execution." },
  { icon: Coins, title: "No Transactions", desc: "Optimized protocol layers that minimize or eliminate standard transaction friction for all users." },
  { icon: Droplet, title: "Liquidity", desc: "Deep liquidity pools integrated across multiple venues ensuring minimal market impact." },
  { icon: ArrowRightLeft, title: "Migration", desc: "Seamless and secure asset migration tools for moving liquidity between networks effortlessly." },
  { icon: LifeBuoy, title: "Asset Recovery", desc: "Industry-first secure recovery and fallback infrastructure for mission-critical digital assets." },
  { icon: Bell, title: "Wallet Notification", desc: "Real-time on-chain alerts pushed directly to your devices for every account movement." },
  { icon: Lock, title: "Data Privacy", desc: "Advanced zero-knowledge encryption protocols to ensure your operational data remains private." },
  { icon: MessageSquare, title: "Notification", desc: "Comprehensive system and market updates to keep you informed of critical protocol events." },
  { icon: Percent, title: "Dynamic Fee", desc: "Intelligent fee structures that adapt to network congestion and provide cost-effective routing." },
  { icon: BarChart2, title: "Slippage Protection", desc: "Sophisticated algorithms designed to protect your trades from front-running and high slippage." },
  { icon: UserPlus, title: "Segregating Beneficiary", desc: "Isolated account structures for managing different beneficiaries with granular permissions." },
  { icon: Key, title: "Backup password", desc: "Secure multi-factor authentication and decentralized recovery phrases for peace of mind." },
  { icon: Layers, title: "Staking", desc: "Participate in network security and earn passive rewards through our integrated staking layer." },
  { icon: LinkIcon, title: "Bridging", desc: "Secure cross-chain infrastructure for moving assets between fragmented ecosystems." },
  { icon: Fingerprint, title: "Authorization", desc: "Granular role-based access control for enterprise-scale wallet management." },
  { icon: Activity, title: "Monitoring", desc: "Deep analytics and real-time monitoring of all protocol interactions and asset flows." },
  { icon: Users, title: "Sub-account", desc: "Manage multiple operational profiles under a single master identity for better organization." },
  { icon: PieChart, title: "Asset tracking", desc: "Comprehensive portfolio visualization and historical performance metrics for all holdings." },
  { icon: Share2, title: "Affiliate", desc: "Earn rewards and grow the ecosystem through our community-driven referral program." },
];

export function AdvantageGrid() {
  return (
    <section id="advantage" className="py-24 lg:py-32 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
            The <span className="text-primary">Reclaimpage</span> Advantage
          </h2>
          <p className="text-slate-400 text-lg">
            A comprehensive suite of verified and scalable tools designed to simplify your Web3 operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="glass group p-6 rounded-[2rem] hover:bg-white/5 transition-all duration-300 border-white/5 hover:border-primary/20">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-primary w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
