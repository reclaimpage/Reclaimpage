'use server';
/**
 * @fileOverview An AI-powered routing engine that suggests cost-effective liquidity paths for Web3 transactions.
 *
 * - genAIRoutingRecommendation - A function that handles the routing recommendation process.
 * - GenAIRoutingRecommendationInput - The input type for the genAIRoutingRecommendation function.
 * - GenAIRoutingRecommendationOutput - The return type for the genAIRoutingRecommendation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenAIRoutingRecommendationInputSchema = z.object({
  sourceAsset: z.string().describe('The ticker symbol or name of the asset being sent (e.g., "ETH", "USDC").'),
  destinationAsset: z.string().describe('The ticker symbol or name of the asset to receive (e.g., "USDT", "DAI").'),
  amount: z.number().positive().describe('The amount of the source asset to transact.'),
  currentMarketConditions: z.string().optional().describe('Optional: Real-time market data or specific conditions to consider for routing (e.g., "ETH gas price is high", "USDC-USDT pool on Uniswap has low liquidity"). This is a simulated real-time data input.'),
});
export type GenAIRoutingRecommendationInput = z.infer<typeof GenAIRoutingRecommendationInputSchema>;

const GenAIRoutingRecommendationOutputSchema = z.object({
  recommendations: z.array(z.object({
    path: z.string().describe('A detailed description of the recommended liquidity path, including exchanges, bridges, or protocols used.'),
    estimatedCostUsd: z.number().positive().describe('The estimated total transaction cost in USD, including gas fees and slippage.'),
    justification: z.string().describe('The reasoning behind this recommendation, explaining why it is considered cost-effective.'),
  })).min(1).describe('An array of recommended liquidity paths, ordered by cost-effectiveness (lowest cost first).'),
  summary: z.string().optional().describe('An overall summary of the routing analysis and the best options.'),
});
export type GenAIRoutingRecommendationOutput = z.infer<typeof GenAIRoutingRecommendationOutputSchema>;

export async function genAIRoutingRecommendation(input: GenAIRoutingRecommendationInput): Promise<GenAIRoutingRecommendationOutput> {
  return genAIRoutingRecommendationFlow(input);
}

const genAIRoutingRecommendationPrompt = ai.definePrompt({
  name: 'genAIRoutingRecommendationPrompt',
  input: { schema: GenAIRoutingRecommendationInputSchema },
  output: { schema: GenAIRoutingRecommendationOutputSchema },
  prompt: `You are an expert Web3 liquidity routing engine. Your task is to analyze a user's desired transaction and real-time market conditions to identify the most cost-effective liquidity paths. Consider gas fees, slippage, and available liquidity across various decentralized exchanges (DEXs), bridges, and protocols.

Input Transaction:
Source Asset: {{{sourceAsset}}}
Destination Asset: {{{destinationAsset}}}
Amount: {{{amount}}}

{{#if currentMarketConditions}}
Current Market Conditions:
{{{currentMarketConditions}}}
{{/if}}

Provide an array of at least one recommended liquidity path, ordered by estimated cost-effectiveness (lowest cost first). For each recommendation, include the detailed path, the estimated total cost in USD, and a clear justification for why it's the best option. Also provide a summary of the analysis.`,
});

const genAIRoutingRecommendationFlow = ai.defineFlow(
  {
    name: 'genAIRoutingRecommendationFlow',
    inputSchema: GenAIRoutingRecommendationInputSchema,
    outputSchema: GenAIRoutingRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await genAIRoutingRecommendationPrompt(input);
    return output!;
  }
);
