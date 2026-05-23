import { NextRequest, NextResponse } from "next/server";

interface ServerProgress {
  userId: string;
  completedExperiments: string[];
  xp: number;
  achievements: string[];
}

const store = new Map<string, ServerProgress>();

function getOrCreate(userId: string): ServerProgress {
  if (!store.has(userId)) {
    store.set(userId, {
      userId,
      completedExperiments: [],
      xp: 0,
      achievements: [],
    });
  }
  return store.get(userId)!;
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") ?? "default";
  const progress = getOrCreate(userId);
  return NextResponse.json(progress);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId ?? "default";
    const progress = getOrCreate(userId);

    if (body.experimentId && !progress.completedExperiments.includes(body.experimentId)) {
      progress.completedExperiments.push(body.experimentId);
      progress.xp += body.xp ?? 150;
      if (progress.completedExperiments.length >= 1) {
        progress.achievements = [...new Set([...progress.achievements, "first-lab"])];
      }
      if (progress.completedExperiments.length >= 3) {
        progress.achievements = [...new Set([...progress.achievements, "explorer"])];
      }
    }

    if (body.xp) progress.xp = body.xp;
    if (body.achievements) progress.achievements = body.achievements;

    store.set(userId, progress);
    return NextResponse.json({ success: true, progress });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
