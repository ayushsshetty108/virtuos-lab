import { ProjectileExperiment } from "@/components/experiments/projectile/ProjectileExperiment";

export const metadata = {
  title: "Projectile Motion | Virtuos Lab",
  description:
    "Interactive 3D projectile motion physics experiment with real-time calculations and trajectory visualization.",
};

export default function ProjectileMotionPage() {
  return <ProjectileExperiment />;
}
