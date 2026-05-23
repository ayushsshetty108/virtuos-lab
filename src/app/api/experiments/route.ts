import { NextRequest, NextResponse } from "next/server";
import { EXPERIMENTS } from "@/lib/experiments";

export async function GET() {
  return NextResponse.json({
    experiments: EXPERIMENTS.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      href: e.href,
      category: e.category,
      duration: e.duration,
    })),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { experimentId, action } = body;

    if (!experimentId) {
      return NextResponse.json({ error: "experimentId required" }, { status: 400 });
    }

    const experiment = EXPERIMENTS.find((e) => e.id === experimentId);
    if (!experiment) {
      return NextResponse.json({ error: "Experiment not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      experimentId,
      action: action ?? "visit",
      message: `Recorded ${action ?? "visit"} for ${experiment.title}`,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
