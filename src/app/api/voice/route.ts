import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text?.trim()) {
      return NextResponse.json({ error: "Text required" }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID ?? "21m00Tcm4TlvDq8ikWAM";

    if (!apiKey) {
      return NextResponse.json({
        useBrowserTTS: true,
        message: "ElevenLabs not configured — client will use browser speech synthesis.",
      });
    }

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: text.slice(0, 1000),
          model_id: "eleven_monolingual_v1",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("ElevenLabs error:", err);
      return NextResponse.json({ useBrowserTTS: true });
    }

    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const audioUrl = `data:audio/mpeg;base64,${base64}`;

    return NextResponse.json({ audioUrl });
  } catch (error) {
    console.error("Voice API error:", error);
    return NextResponse.json({ useBrowserTTS: true }, { status: 200 });
  }
}
