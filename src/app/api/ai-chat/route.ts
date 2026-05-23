import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `You are Virtuos Lab AI, an expert science tutor for a virtual laboratory platform.
Help students with physics (projectile motion, pendulum, circuits) and chemistry experiments.
Be concise, encouraging, and use clear explanations. Reference real formulas when helpful.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages?.length) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const lastUser = [...messages].reverse().find((m: { role: string }) => m.role === "user");
      return NextResponse.json({
        reply: getFallbackReply(lastUser?.content ?? ""),
        demo: true,
      });
    }

    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 600,
      temperature: 0.7,
    });

    const reply =
      completion.choices[0]?.message?.content ??
      "I could not generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Failed to process AI request" },
      { status: 500 }
    );
  }
}

function getFallbackReply(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("projectile") || q.includes("range")) {
    return "Projectile range R = (v₀² sin 2θ) / g. Maximum range occurs at 45° on level ground. Try the Projectile Motion lab to see it live!";
  }
  if (q.includes("pendulum") || q.includes("period")) {
    return "A simple pendulum period T ≈ 2π√(L/g) for small angles. Open the Pendulum experiment to adjust length and gravity.";
  }
  if (q.includes("circuit") || q.includes("ohm")) {
    return "Ohm's law: V = IR. In the Circuit Builder, increase voltage or decrease resistance to raise current and light the bulb.";
  }
  if (q.includes("chemistry") || q.includes("reaction")) {
    return "Chemical reactions rearrange atoms. In Chemistry Lab, mix acid-base pairs to see color changes and energy release.";
  }
  return "I'm running in demo mode (add OPENAI_API_KEY for full AI). Ask me about projectile motion, pendulums, circuits, or chemistry!";
}
