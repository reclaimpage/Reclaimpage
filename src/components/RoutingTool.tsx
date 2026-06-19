"use client";

import { useState } from "react";
import { genAIRoutingRecommendation, type GenAIRoutingRecommendationOutput } from "@/ai/flows/gen-ai-routing-recommendation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function RoutingTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenAIRoutingRecommendationOutput | null>(null);
  const [formData, setFormData] = useState({
    sourceAsset: "ETH",
    destinationAsset: "USDC",
    amount: 10
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await genAIRoutingRecommendation({
        ...formData,
        currentMarketConditions: "Gas prices are slightly elevated on Ethereum. Arbitrum liquidity is high for the requested pair."
      });
      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="routing" className="py-24 lg:py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/20 mb-4 px-4 py-1">GEN-AI POWERED</Badge>
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Intelligent Routing Engine</h2>
          <p className="text-slate-400">Identify the most cost-effective liquidity paths across networks instantly.</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-[2.5rem] shadow-neon">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="space-y-2">
              <label className="text-xs font-headline font-bold uppercase tracking-widest text-slate-500">Source Asset</label>
              <Input 
                value={formData.sourceAsset} 
                onChange={e => setFormData({...formData, sourceAsset: e.target.value})}
                className="glass bg-white/5 border-white/10 h-14 font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-headline font-bold uppercase tracking-widest text-slate-500">Destination</label>
              <Input 
                value={formData.destinationAsset} 
                onChange={e => setFormData({...formData, destinationAsset: e.target.value})}
                className="glass bg-white/5 border-white/10 h-14 font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-headline font-bold uppercase tracking-widest text-slate-500">Amount</label>
              <Input 
                type="number" 
                value={formData.amount} 
                onChange={e => setFormData({...formData, amount: Number(e.target.value)})}
                className="glass bg-white/5 border-white/10 h-14 font-bold"
              />
            </div>
            <div className="md:col-span-3">
              <Button type="submit" disabled={loading} className="w-full bg-primary text-black font-bold h-14 rounded-xl text-lg hover:scale-[1.01] transition-transform">
                {loading ? <Loader2 className="animate-spin" /> : "Analyze Optimal Path"}
              </Button>
            </div>
          </form>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                <h4 className="font-headline font-bold text-primary mb-2">Analysis Summary</h4>
                <p className="text-slate-300 text-sm italic">{result.summary}</p>
              </div>

              <div className="space-y-4">
                {result.recommendations.map((rec, i) => (
                  <Card key={i} className={cn("glass border-none transition-all", i === 0 ? "shadow-glow ring-1 ring-primary/20" : "opacity-70")}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-headline font-bold flex items-center gap-2">
                            {i === 0 && <Zap size={18} className="text-primary" />}
                            Recommendation #{i + 1}
                          </CardTitle>
                          <CardDescription className="text-slate-400 font-medium">
                            {rec.path}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-primary font-headline text-2xl font-black">${rec.estimatedCostUsd}</div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Est. Cost (USD)</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        <span className="text-slate-200 font-bold mr-2">Justification:</span>
                        {rec.justification}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
