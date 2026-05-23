export interface ProjectileParams {
  velocity: number; // m/s
  angleDeg: number; // degrees
  gravity: number; // m/s²
}

export interface ProjectileState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  t: number;
}

export interface ProjectileMetrics {
  range: number;
  maxHeight: number;
  timeOfFlight: number;
  vx0: number;
  vy0: number;
}

const DEG2RAD = Math.PI / 180;

export function angleToRadians(deg: number): number {
  return deg * DEG2RAD;
}

export function computeMetrics(params: ProjectileParams): ProjectileMetrics {
  const { velocity: v0, angleDeg, gravity: g } = params;
  const theta = angleToRadians(angleDeg);
  const vx0 = v0 * Math.cos(theta);
  const vy0 = v0 * Math.sin(theta);

  const timeOfFlight = (2 * vy0) / g;
  const range = vx0 * timeOfFlight;
  const maxHeight = (vy0 * vy0) / (2 * g);

  return { range, maxHeight, timeOfFlight, vx0, vy0 };
}

export function positionAt(
  params: ProjectileParams,
  t: number
): ProjectileState {
  const { velocity: v0, angleDeg, gravity: g } = params;
  const theta = angleToRadians(angleDeg);
  const vx0 = v0 * Math.cos(theta);
  const vy0 = v0 * Math.sin(theta);

  return {
    x: vx0 * t,
    y: vy0 * t - 0.5 * g * t * t,
    vx: vx0,
    vy: vy0 - g * t,
    t,
  };
}

export function generateTrajectory(
  params: ProjectileParams,
  steps = 120
): ProjectileState[] {
  const { timeOfFlight } = computeMetrics(params);
  const points: ProjectileState[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * timeOfFlight;
    const state = positionAt(params, t);
    if (state.y >= 0 || i === 0) {
      points.push(state);
    }
  }

  // Ensure landing point
  const landing = positionAt(params, timeOfFlight);
  if (points[points.length - 1]?.t !== timeOfFlight) {
    points.push({ ...landing, y: 0 });
  }

  return points;
}

export function sampleTrajectorySeries(
  params: ProjectileParams,
  steps = 80
): { x: number; y: number; t: number }[] {
  return generateTrajectory(params, steps).map((p) => ({
    x: p.x,
    y: Math.max(0, p.y),
    t: p.t,
  }));
}
