"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Shield, Loader2, Key } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) {
        router.replace("/admin");
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: error.message,
        });
      } else if (data.session) {
        toast({
          title: "Access Granted",
          description: "Initializing secure session...",
        });
        // Use replace and refresh to ensure session is recognized
        router.replace("/admin");
        router.refresh();
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] rounded-full bg-emerald-500/5 blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 bottom-0 w-[40rem] h-[40rem] rounded-full bg-emerald-500/5 blur-[120px] translate-x-1/2 translate-y-1/2"></div>
      </div>

      <Card className="w-full max-w-[420px] glass border-white/5 bg-[#131A26]/50 relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <CardHeader className="text-center pt-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="text-primary w-8 h-8" />
          </div>
          <CardTitle className="font-headline text-3xl font-black uppercase tracking-tight text-white">Admin Access</CardTitle>
          <CardDescription className="text-slate-500 font-medium">Secure Authorization Gateway</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Admin Email</label>
              <Input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/40 border-white/5 h-14 pl-6 text-white rounded-2xl focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Security Key</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/40 border-white/5 h-14 pl-6 text-white rounded-2xl focus-visible:ring-primary/50"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-primary text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl gap-3 shadow-neon transition-all hover:scale-[1.02]"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Shield size={16} />}
              Authenticate Session
            </Button>
          </form>

          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <div className="inline-flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
              <Key size={12} />
              AES-256 Encrypted Login
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
