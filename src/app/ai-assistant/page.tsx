import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AIAssistantPanel } from "@/components/ai/AIAssistantPanel";

export const metadata = {
  title: "AI Assistant | Virtuos Lab",
  description: "AI-powered science tutor with voice narration and speech recognition.",
};

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-[#030712] px-6 py-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Lab
        </Link>
        <h1 className="font-[family-name:var(--font-orbitron)] text-3xl font-bold text-white mb-2">
          AI <span className="text-violet-400">Lab Companion</span>
        </h1>
        <p className="text-slate-400 mb-8">
          Voice-guided tutoring, experiment explanations, and real-time Q&A.
        </p>
        <div className="glass-strong rounded-3xl p-6 border border-violet-500/20 min-h-[600px]">
          <AIAssistantPanel />
        </div>
      </div>
    </div>
  );
}
