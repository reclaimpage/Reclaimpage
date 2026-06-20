import { ShieldAlert, Lock, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] rounded-full bg-emerald-500/5 blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 bottom-0 w-[40rem] h-[40rem] rounded-full bg-emerald-500/5 blur-[120px] translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-lg w-full text-center space-y-10 relative z-10">
        <div className="space-y-6">
          <div className="w-24 h-24 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-neon">
            <Lock size={48} className="text-emerald-500" />
          </div>
          <div className="space-y-4">
            <h1 className="font-headline text-4xl font-black uppercase tracking-tight text-white leading-tight">
              Access Restricted
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto font-medium">
              This terminal requires a cryptographically signed access link for network entry. Direct root connections are disabled by administrator protocol.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 text-left group hover:border-emerald-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <ShieldAlert size={20} />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Status</div>
              <div className="text-xs text-slate-300 font-bold">Unauthorized Connection Attempt</div>
            </div>
          </div>
          
          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center text-slate-500">
              <Globe size={20} />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Network Node</div>
              <div className="text-xs text-slate-300 font-bold">Encrypted Distributed Mesh v2.4</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">
             <Lock size={12} /> AES-256 SECURED ENVIRONMENT
          </div>
          <div className="flex gap-4">
             <Link href="/admin/login">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-white">
                  Admin Login
                </Button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
