import { ShieldAlert, Lock, Globe, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070B12] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] rounded-full bg-[#10B981]/5 blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 bottom-0 w-[40rem] h-[40rem] rounded-full bg-[#10B981]/5 blur-[120px] translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-lg w-full text-center space-y-10 relative z-10">
        <div className="space-y-6">
          <div className="w-24 h-24 rounded-[2.5rem] bg-[#10B981]/10 flex items-center justify-center mx-auto border border-[#10B981]/20 shadow-neon group hover:scale-105 transition-transform duration-500">
            <Lock size={48} className="text-[#10B981]" />
          </div>
          <div className="space-y-4">
            <h1 className="font-headline text-4xl font-black uppercase tracking-tight text-white leading-tight">
              Access Restricted
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto font-medium font-body">
              This terminal requires a cryptographically signed access link. Direct root connections are disabled by network administrator protocol.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="glass p-6 rounded-2xl flex items-center gap-4 text-left group hover:border-[#10B981]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
              <ShieldAlert size={20} />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-headline">Protocol Status</div>
              <div className="text-xs text-slate-200 font-bold">Unauthorized Connection Detected</div>
            </div>
          </div>
          
          <div className="glass p-6 rounded-2xl flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
              <Globe size={20} />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-headline">Network Node</div>
              <div className="text-xs text-slate-200 font-bold">Enterprise Distributed Mesh v2.4</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] font-headline">
             <Key size={12} className="text-[#10B981]/50" /> AES-256 SECURED ENVIRONMENT
          </div>
          <div className="flex gap-4">
             <Link href="/admin/login">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 h-12 rounded-xl px-8">
                  Admin Gateway
                </Button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}