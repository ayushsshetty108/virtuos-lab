export interface UserProgress {
  completedExperiments: string[];
  xp: number;
  lastVisited: string | null;
  achievements: string[];
}

const STORAGE_KEY = "virtuos-lab-progress";

const DEFAULT: UserProgress = {
  completedExperiments: [],
  xp: 0,
  lastVisited: null,
  achievements: [],
};

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function saveProgress(progress: Partial<UserProgress>): UserProgress {
  const current = getProgress();
  const next = { ...current, ...progress };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function markExperimentComplete(experimentId: string): UserProgress {
  const current = getProgress();
  const completed = current.completedExperiments.includes(experimentId)
    ? current.completedExperiments
    : [...current.completedExperiments, experimentId];
  const xp = current.xp + 150;
  const achievements = [...current.achievements];
  if (completed.length >= 1 && !achievements.includes("first-lab"))
    achievements.push("first-lab");
  if (completed.length >= 3 && !achievements.includes("explorer"))
    achievements.push("explorer");
  if (completed.length >= 5 && !achievements.includes("master-scientist"))
    achievements.push("master-scientist");

  return saveProgress({
    completedExperiments: completed,
    xp,
    achievements,
    lastVisited: experimentId,
  });
}
