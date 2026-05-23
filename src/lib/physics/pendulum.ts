export interface PendulumParams {
  length: number; // meters
  gravity: number;
  angleRad: number; // initial angle
  damping: number;
}

export function pendulumAcceleration(
  angle: number,
  length: number,
  gravity: number,
  damping: number,
  angularVelocity: number
): number {
  return -(gravity / length) * Math.sin(angle) - damping * angularVelocity;
}

export function stepPendulum(
  angle: number,
  angularVelocity: number,
  params: PendulumParams,
  dt: number
): { angle: number; angularVelocity: number } {
  const k1a = angularVelocity;
  const k1v = pendulumAcceleration(
    angle,
    params.length,
    params.gravity,
    params.damping,
    angularVelocity
  );

  const k2a = angularVelocity + 0.5 * dt * k1v;
  const k2v = pendulumAcceleration(
    angle + 0.5 * dt * k1a,
    params.length,
    params.gravity,
    params.damping,
    angularVelocity + 0.5 * dt * k1v
  );

  const k3a = angularVelocity + 0.5 * dt * k2v;
  const k3v = pendulumAcceleration(
    angle + 0.5 * dt * k2a,
    params.length,
    params.gravity,
    params.damping,
    angularVelocity + 0.5 * dt * k2v
  );

  const k4a = angularVelocity + dt * k3v;
  const k4v = pendulumAcceleration(
    angle + dt * k3a,
    params.length,
    params.gravity,
    params.damping,
    angularVelocity + dt * k3v
  );

  return {
    angle: angle + (dt / 6) * (k1a + 2 * k2a + 2 * k3a + k4a),
    angularVelocity:
      angularVelocity + (dt / 6) * (k1v + 2 * k2v + 2 * k3v + k4v),
  };
}

export function bobPosition(length: number, angle: number): [number, number, number] {
  return [
    length * Math.sin(angle),
    -length * Math.cos(angle),
    0,
  ];
}
