"use client";

import { 
  Link as LinkIcon, 
  Lock, 
  ShieldCheck, 
  Package, 
  CircleDollarSign, 
  LogIn, 
  ArrowLeftRight, 
  RotateCcw, 
  Shield, 
  LifeBuoy, 
  LineChart, 
  Wallet, 
  MessageSquare, 
  Box, 
  Layers, 
  Share2, 
  LogOut, 
  Disc, 
  Image, 
  Coins, 
  ListChecks, 
  Timer, 
  Truck, 
  ShoppingBag, 
  BadgeDollarSign, 
  MessagesSquare
} from "lucide-react";
import { WalletModal } from "@/components/WalletModal";

const features = [
  { icon: LinkIcon, title: "Connect to Dapps", desc: "Enterprise resolution for dApp connectivity failures." },
  { icon: Lock, title: "Validation", desc: "Institutional-grade cryptographic validation protocols." },
  { icon: ShieldCheck, title: "Rectification", desc: "Automated smart contract and state rectification." },
  { icon: Package, title: "Claim Airdrop", desc: "Secure multi-network token claim orchestration." },
  { icon: CircleDollarSign, title: "Buy Token", desc: "Streamlined payment gateway for asset acquisition." },
  { icon: LogIn, title: "Login", desc: "Credential recovery and secure auth troubleshooting." },
  { icon: ArrowLeftRight, title: "Migration", desc: "Zero-loss automated asset migration engines." },
  { icon: RotateCcw, title: "Restore", desc: "Deep recovery for lost or corrupted wallet states." },
  { icon: Shield, title: "Reflection", desc: "Dividend and reflection tracking infrastructure." },
  { icon: LifeBuoy, title: "Assets Recovery", desc: "Specialized recovery for misrouted digital assets." },
  { icon: LineChart, title: "High Gas Fees", desc: "Gas-optimized execution for cost-effective operations." },
  { icon: Wallet, title: "Claim Presale Token", desc: "Automated vesting and presale claim management." },
  { icon: MessageSquare, title: "Slippage Error", desc: "Low-latency trading and slippage optimization." },
  { icon: Box, title: "Transaction Error", desc: "Real-time diagnostic and recovery for failed txns." },
  { icon: Layers, title: "Staking Issues", desc: "Yield optimization and staking protocol resolution." },
  { icon: ArrowLeftRight, title: "Swap/Exchange", desc: "Secure cross-DEX asset swapping infrastructure." },
  { icon: Share2, title: "Cross Chain Transfer", desc: "Multi-bridge liquidity routing and management." },
  { icon: LogOut, title: "Login Issues", desc: "Session recovery and multi-device auth troubleshooting." },
  { icon: Disc, title: "Claim Airdrop", desc: "Ecosystem-wide distribution event management." },
  { icon: Image, title: "NFTs Issues", desc: "NFT minting, transfer, and metadata resolution." },
  { icon: Coins, title: "Missing/ Irregular Balance", desc: "Ledger reconciliation and fund recovery." },
  { icon: ListChecks, title: "Whitelist", desc: "Allocation management and whitelist validation." },
  { icon: Timer, title: "Transaction Delay", desc: "Network latency monitoring and acceleration." },
  { icon: Truck, title: "Migration Issues", desc: "Large-scale institutional asset migrations." },
  { icon: ShoppingBag, title: "Trading Wallet", desc: "Advanced terminal for professional trading operations." },
  { icon: BadgeDollarSign, title: "Can't Buy Coins/Tokens", desc: "Payment source validation and trusted routing." },
  { icon: Lock, title: "Locked Account", desc: "Security override and identity-based unlocking." },
  { icon: MessagesSquare, title: "Other Issues Not Listed", desc: "Custom resolution for unique Web3 operational needs." },
];

export function AdvantageGrid() {
  return (
    <section id="advantage" className="py-24 lg:py-32 bg-[#070B12] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            The <span className="bg-gradient-to-r from-[#10B981] to-[#34D399] bg-clip-text text-transparent">Reclaimpage</span> Advantage
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed font-body">
            Professional resolution for high-stakes Web3 operations. We deliver automated, secure, and rapid infrastructure solutions for the decentralized ecosystem.
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
            Select Operation to Proceed
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <WalletModal key={feature.title}>
              <button className="glass group p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-300 hover:scale-[1.02] text-left w-full focus:outline-none focus:ring-2 focus:ring-[#10B981]/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981]/20 to-transparent flex items-center justify-center mb-6 border border-white/5 group-hover:border-[#10B981]/30 transition-all duration-300">
                  <feature.icon className="text-[#10B981] w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-headline text-lg font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-xs font-medium">
                  {feature.desc}
                </p>
              </button>
            </WalletModal>
          ))}
        </div>
      </div>
    </section>
  );
}