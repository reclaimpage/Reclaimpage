import { createClient } from "@/lib/supabase-server";
import { AdvantageGrid } from "@/components/AdvantageGrid";
import { ShieldAlert, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function SecurePortalPage({ params }: PageProps) {
  const { token } = await params;
  const cookieStore = await cookies();
  const sessionCookieName = `portal_session_${token}`;
  const sessionToken = cookieStore.get(sessionCookieName);
  
  const supabase = await createClient();

  // Validate token with Supabase Server Client
  const { data, error } = await supabase
    .from("access_tokens")
    .select("*")
    .eq("token", token)
    .single();

  const isExpired = data ? new Date(data.expires_at) < new Date() : true;
  const isFull = data ? data.used_count >= data.usage_limit : true;
  
  // If we don't have a session cookie, we need to activate one
  if (!sessionToken) {
    // If it's already full or expired and we have no session, they are blocked
    if (!data || error || isExpired || isFull) {
      return (
        <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-8">
            <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mx-auto border border-red-500/20 animate-pulse">
              <ShieldAlert size={48} className="text-red-500" />
            </div>
            <div className="space-y-4">
              <h1 className="font-headline text-3xl font-black uppercase tracking-tight text-white">Access Denied</h1>
              <p className="text-slate-500 leading-relaxed">
                This secure portal token has expired, reached its usage limit, or was revoked by network administrators.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 text-left">
                <Clock size={20} className="text-slate-600 shrink-0" />
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Status</div>
                  <div className="text-xs text-slate-400">
                    {!data ? "Invalid token ID" : isExpired ? "TTL (Time To Live) exceeded" : "Usage quota reached"}
                  </div>
                </div>
              </div>
              <Link href="/" className="w-full">
                <Button className="w-full h-14 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/5">
                  Return to Gateway
                </Button>
              </Link>
            </div>
            <div className="pt-8 flex items-center justify-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">
               <Lock size={12} /> AES-256 SECURED
            </div>
          </div>
        </div>
      );
    }

    // Redirect to activation handler to increment usage and set cookie
    redirect(`/api/portal/activate?token=${token}`);
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white selection:bg-primary/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] rounded-full bg-emerald-500/5 blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 top-40 w-[30rem] h-[30rem] rounded-full bg-green-400/5 blur-[100px] translate-x-1/4"></div>
        <div className="absolute bottom-0 left-1/2 w-[50rem] h-[50rem] rounded-full bg-emerald-500/5 blur-[150px] -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        <main>
          <AdvantageGrid />
        </main>
      </div>
    </div>
  );
}
