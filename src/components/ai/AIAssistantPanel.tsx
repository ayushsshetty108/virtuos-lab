"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIAssistantPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to Virtuos Lab. I'm your AI science tutor. Ask me about any experiment — projectile motion, pendulums, circuits, or chemistry!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? data.error ?? "No response." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages]);

  const startListening = () => {
    const SR =
      typeof window !== "undefined"
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;
    if (!SR) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Speech recognition is not supported in this browser.",
        },
      ]);
      return;
    }
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const speakLast = async () => {
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    if (!last) return;
    setSpeaking(true);
    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: last.content }),
      });
      const data = await res.json();
      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        await audio.play();
      } else if (data.useBrowserTTS || "speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance(last.content);
        u.rate = 0.95;
        speechSynthesis.speak(u);
      }
    } catch {
      if ("speechSynthesis" in window) {
        speechSynthesis.speak(new SpeechSynthesisUtterance(last.content));
      }
    } finally {
      setSpeaking(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-100"
                    : "glass border border-violet-500/20 text-slate-300"
                }`}
              >
                {msg.role === "assistant" && (
                  <Sparkles className="h-3 w-3 text-violet-400 mb-1 inline mr-1" />
                )}
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={listening ? stopListening : startListening}
          className={`rounded-full p-3 border transition-all ${
            listening
              ? "border-pink-500/50 bg-pink-500/20 text-pink-300"
              : "glass border-white/10 text-slate-400 hover:text-cyan-400"
          }`}
          aria-label={listening ? "Stop listening" : "Start speech recognition"}
        >
          {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        <button
          type="button"
          onClick={speakLast}
          disabled={speaking}
          className="rounded-full p-3 glass border border-white/10 text-slate-400 hover:text-violet-400"
          aria-label="Text to speech"
        >
          <Volume2 className={`h-5 w-5 ${speaking ? "animate-pulse text-violet-400" : ""}`} />
        </button>
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about experiments, physics, chemistry..."
          className="flex-1 rounded-full glass border border-white/10 px-5 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full px-5 py-3 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/40 text-cyan-100 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
