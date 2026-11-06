import type { UserInteraction, AnalysisResult, CreativeArtResult } from '../types';
async function request<T>(body: unknown): Promise<T> {
  const response = await fetch('/api/art', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(115000)});
  const result=await response.json(); if(!response.ok) throw new Error(result.error || 'AI connection failed.'); return result as T;
}
export const analyzeUserStyle = (history: UserInteraction[]) => request<AnalysisResult>({action:'analyze',history:history.slice(-100)});
export const generateCreativeArt = (history: UserInteraction[], analysis: string, comment: string, mode: 'static'|'camera'|'audio'='static') => request<CreativeArtResult>({action:'generate',history:history.slice(-100),analysis,comment,mode});
